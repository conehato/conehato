export const imageUrlInHtml = new RegExp(
  `src="https://${process.env.IMAGE_URL_PREFIX}\\.public\\.blob\\.vercel-storage\\.com/.*?">`
);
