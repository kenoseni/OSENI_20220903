import { cloudinary } from "./config";
import streamifier from "streamifier";

export const uploadVideoToCloudinary = async (file: any) => {
  const fName = file.originalname.split(".")[0];
  const options = {
    public_id: `video/${fName}`,
    resource_type: "video",
    chunk_size: 6000000,
    tags: "video",
    use_filename: false,
    unique_filename: false,
    overwrite: false,
  };

  const { secure_url }: any = await cloudinary.uploader
    .upload(file.path, options)
    .catch((err) => {
      console.error(err);
    });

  return secure_url;
};

export const uploadImageWithStream = async (
  buffer: Buffer,
  fileName: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `thumbnail/${fileName}`,
        upload_preset: "ml_default",
      },
      (error: any, result: any) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
