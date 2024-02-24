import * as jpeg from "@jsquash/jpeg";
import * as png from "@jsquash/png";
import * as webp from "@jsquash/webp";
import resize from "@jsquash/resize";

async function decode(sourceType, fileBuffer) {
  switch (sourceType) {
    case "jpeg":
      return await jpeg.decode(fileBuffer);
    case "jpg":
      return await jpeg.decode(fileBuffer);
    case "png":
      return await png.decode(fileBuffer);
    case "webp":
      return await webp.decode(fileBuffer);
    default:
      throw new Error(`Unknown source type: ${sourceType}`);
  }
}

export async function encode(image) {
  const imageType = image.type.split("/")[1];
  const imageBuffer = await image.arrayBuffer();
  const originalImageData = await decode(imageType, imageBuffer);

  const resizedImageData = await resize(originalImageData, {
    width: 500,
    height: 500 / (originalImageData.width / originalImageData.height),
  });
  return await webp.encode(resizedImageData);
}
