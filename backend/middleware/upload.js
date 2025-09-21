// backend/middleware/upload.js
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "podhub/episodes",
      resource_type:"auto", // audio/video files
    };
  },
});

const upload = multer({ storage });

export default upload;
