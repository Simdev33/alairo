import os from "node:os";

export type LanHost = { name: string; address: string; score: number };

const VIRTUAL = /vethernet|virtualbox|vbox|vmware|hyper-v|wsl|docker|loopback|bluetooth|nord|vpn|tailscale|zerotier|hamachi|surfshark|openvpn|wireguard|tap|tun|utun|bridge|br-/i;

/** A gép helyi hálózati IPv4-címei, a legvalószínűbb (Wi-Fi / Ethernet) elöl. */
export function lanHosts(): LanHost[] {
  const out: LanHost[] = [];
  for (const [name, addrs] of Object.entries(os.networkInterfaces())) {
    for (const a of addrs ?? []) {
      if (a.family !== "IPv4" || a.internal) continue;
      if (a.address.startsWith("169.254.")) continue;
      let score = 0;
      if (/wi-?fi|wlan|wireless/i.test(name)) score += 3;
      else if (/ethernet|^eth|^en/i.test(name)) score += 2;
      if (VIRTUAL.test(name)) score -= 10;
      if (a.address.startsWith("192.168.56.") || a.address.startsWith("192.168.99.")) score -= 8;
      if (a.address.startsWith("192.168.")) score += 2;
      else if (a.address.startsWith("10.")) score += 1;
      out.push({ name, address: a.address, score });
    }
  }
  return out.sort((a, b) => b.score - a.score);
}

const LOCAL = new Set(["localhost", "127.0.0.1", "[::1]", "::1", "0.0.0.0"]);

/**
 * A QR-kódba kerülő alap-URL. Ha a gépet localhoston nyitották meg, a telefon ezt nem éri el,
 * ezért a helyi hálózati IP-t használjuk ugyanazon a porton.
 */
export function phoneBaseUrls(req: Request): { primary: string; alternatives: { label: string; url: string }[] } {
  const fixed = process.env.PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (fixed) return { primary: fixed, alternatives: [] };

  const url = new URL(req.url);
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? url.host;
  const proto = req.headers.get("x-forwarded-proto") ?? url.protocol.replace(":", "");
  const hostname = host.replace(/:\d+$/, "");
  const port = host.match(/:(\d+)$/)?.[1];

  if (!LOCAL.has(hostname)) return { primary: `${proto}://${host}`, alternatives: [] };

  const hosts = lanHosts();
  const alternatives = hosts.map((h) => ({
    label: `${h.address} · ${h.name}`,
    url: `${proto}://${h.address}${port ? `:${port}` : ""}`,
  }));
  return { primary: alternatives[0]?.url ?? `${proto}://${host}`, alternatives };
}
