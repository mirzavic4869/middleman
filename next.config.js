/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/payment/:token",
        destination:
          "https://app.sandbox.midtrans.com/snap/v3/redirection/:token",
        permanent: false,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig
