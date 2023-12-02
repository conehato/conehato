/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedForwardedHosts: ['shiny-happiness-q6v546ggpx62vj4-3000.app.github.dev'],
    },
  },
  transpilePackages: ["@ckeditor/ckeditor5-build-classic"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: `${process.env.IMAGE_URL_PREFIX}.public.blob.vercel-storage.com`,
      },
    ],
  },
};

module.exports = nextConfig;

