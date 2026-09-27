import type { NextConfig } from "next";
import os from "node:os";

// A telefon a gép helyi hálózati IP-jén éri el a dev szervert — ezeket engedélyezni kell.
const lanAddresses = Object.values(os.networkInterfaces())
  .flat()
  .filter((a) => a && a.family === "IPv4" && !a.internal)
  .map((a) => a!.address);

const nextConfig: NextConfig = {
  allowedDevOrigins: lanAddresses,
  poweredByHeader: false,
  devIndicators: false,
};

export default nextConfig;
