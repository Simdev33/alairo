# Kézjegy — aláírás telefonról, egy QR-kóddal

Tölts fel egy PDF-et vagy Word-dokumentumot, olvasd be a QR-kódot a telefonoddal, írd alá az ujjaddal,
és húzd az aláírást a dokumentum bármelyik oldalára. A végén letöltöd az aláírt PDF-et.

## Helyi futtatás

```bash
npm install
npm run dev
```

Gépen: http://localhost:3238 — a QR-kód automatikusan a gép helyi hálózati címére mutat
(pl. `http://192.168.1.110:3238/s/…`), így a telefon **ugyanazon a Wi-Fi-n** eléri.
Ha több hálózati kártya van, a QR-kártyán a „Nem nyílik meg a telefonon?” alatt lehet másik címet választani.

## Feltöltés Vercelre

1. Tedd fel a projektet GitHubra, és a Vercelen importáld (a Next.js beállításokat magától felismeri).
2. A Vercel projektben: **Storage → Create / Connect → Upstash for Redis** (az ingyenes csomag bőven elég),
   és kösd a projekthez. Ez beállítja a `KV_REST_API_URL` és `KV_REST_API_TOKEN` változókat.
   (Ha az Upstash konzolból hozod, az `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` nevek is jók.)
3. Deploy (vagy Redeploy, ha a Redist utólag kötötted be). Kész — a QR-kód magától a Vercel-címre mutat.

Redis nélkül Vercelen a telefonos rész nem megbízható: a telefon és a gép kérései különböző szerverpéldányokra
futhatnak be, és nem látják egymás munkamenetét.

## Hogyan működik

- **PDF**: a böngésző nyitja meg (pdf.js), és a böngésző írja bele az aláírást (pdf-lib) — nem kerül fel a szerverre.
  Az aláírás **vektorosan** kerül a PDF-be, forgatott és levágott oldalakon is pontos helyre.
  Titkosított PDF-nél az oldalak képként mentődnek.
- **Word**:
  - ha a szerveren van LibreOffice (vagy `SOFFICE_PATH`) vagy Windowson Microsoft Word, a szerver alakítja PDF-fé
    (a legjobb minőség, a szöveg kijelölhető marad);
  - különben (pl. **Vercelen**) a **böngésző** alakítja át a `.docx`-et: oldalanként képpé renderelve. A régi `.doc`
    formátumot így nem lehet megnyitni — azt a felhasználó mentse `.docx`-ként vagy PDF-ként.
- **Telefon ↔ gép**: a munkamenet egy óráig él. Helyben memóriában, és a gép Server-Sent Eventsszel kapja
  a változásokat; Redisszel (Vercelen) a gép rövid időközönként kérdez rá, és csak változáskor kap adatot.

## Környezeti változók

| Változó | Mire jó |
| --- | --- |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` (vagy `UPSTASH_REDIS_REST_*`) | Upstash Redis — Vercelen kötelező |
| `PUBLIC_BASE_URL` | Ha be van állítva (pl. `https://alairas.example.hu`), a QR-kód erre mutat |
| `SOFFICE_PATH` | A LibreOffice `soffice` programjának útvonala, ha nem a szokásos helyen van |
| `DISABLE_SERVER_CONVERT=1` | A szerveres Word-átalakítás kikapcsolása (a böngészős tesztelésére) |

A Kézjegy egyszerű elektronikus aláírást (a kézi aláírás képét) helyez el a dokumentumban; ez nem minősített
elektronikus aláírás.
