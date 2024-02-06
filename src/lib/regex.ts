export const imageUrlInHtml = new RegExp(
  `src="https://${process.env.AWS_BUCKET_NAME}\\.s3\\.${process.env.AWS_REGION}\\.amazonaws\\.com/.*?">`
);
