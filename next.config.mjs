/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "greengrub-theme.myshopify.com",
      },
    ],
  },
};

export default nextConfig;
