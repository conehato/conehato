/** @type {import('next').NextConfig} */
const nextConfig =
  process.env.NODE_ENV === "development"
    ? {
        experimental: {
          serverActions: {
            allowedForwardedHosts: [
              "shiny-happiness-q6v546ggpx62vj4-3000.app.github.dev",
            ],
          },
        },
        transpilePackages: ["@ckeditor/ckeditor5-build-classic"],
        images: {
          remotePatterns: [
            {
              protocol: "https",
              hostname: `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
            },
          ],
        },
      }
    : {
        transpilePackages: ["@ckeditor/ckeditor5-build-classic"],
        images: {
          remotePatterns: [
            {
              protocol: "https",
              hostname: `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
            },
          ],
        },
      };

module.exports = nextConfig;
