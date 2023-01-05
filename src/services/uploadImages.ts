import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
config();

interface IResult {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
  type: string;
  url: string;
  secure_url: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export const uploadMainImage = async (
  main_image: string,
  folderName: string
) => {
  try {
    const result = await cloudinary.uploader.upload(main_image, {
      folder: `/products/${folderName}`,
    });

    return result.url;
  } catch (error: any) {
    return error;
  }
};

export const uploadImages = (imagesArray: string[], folderName: string) => {
  const images: string[] = [];
  imagesArray.forEach((image) => {
    cloudinary.uploader
      .upload(image, { folder: `/products/${folderName}/${image}` })
      .then((result: IResult) => {
        images.push(result.url);
      });
  });

  return images;
};
