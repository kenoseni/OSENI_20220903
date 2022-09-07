import fs from "fs";
import path from "path";
import { uploadImageWithStream } from "../services/cloudinary/upload";

type SecureUrl = {
  secure_url: string;
};

export const getThumbnailDetails = async (size: string, videoId: string) => {
  const filePath = path.join(__dirname, `../controllers/thumbnail/${size}.png`);
  const basename = path.basename(filePath);
  const thumbs = fs.readFileSync(filePath);
  const { secure_url }: SecureUrl = await uploadImageWithStream(
    thumbs,
    basename
  );

  return { name: size, thumbnailUrl: secure_url, videoId };
};
