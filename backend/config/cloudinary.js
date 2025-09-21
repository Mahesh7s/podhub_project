// backend/config/cloudinary.js
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";


console.log("Cloudinary ENV:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY ? "Loaded ✅" : "Missing ❌ yes",
  secret: process.env.CLOUDINARY_API_SECRET ? "Loaded ✅" : "Missing ❌",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
