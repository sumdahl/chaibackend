import { v2 as cloudinary } from "cloudinary";
import { error } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("Could not find the filepath");
      return null;
    } else {
      const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
      });
      // console.log(uploadResponse)
      fs.unlinkSync(localFilePath);
      return uploadResponse;
    }
  } catch (uploadError) {
    console.error("Error uploading files: ", uploadError);
    try {
      if (localFilePath) {
        fs.unlinkSync(localFilePath); //remove the locally saved temp file as the upload operation got failed
        console.log("Temporary file removed:", localFilePath);
      }
    } catch (removeError) {
      console.error("Failed to remove temporary file:", removeError);
    }
    return null;
  }
};


export { uploadOnCloudinary };
