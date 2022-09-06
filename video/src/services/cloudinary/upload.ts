import { cloudinary } from "./config";

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
