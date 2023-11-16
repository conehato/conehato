/** @type {import('next').NextConfig} */
const nextConfig = {
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
