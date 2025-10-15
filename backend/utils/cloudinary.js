import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

import dotenv from "dotenv";

dotenv.config();
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});



// Upload an image
 const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if(!localFilePath) return null
        console.log("Uploading file to Cloudinary:", localFilePath);
             const response = await cloudinary.uploader.upload(localFilePath, {
                        resource_type: "auto",
                });
                // console.log("file is uploaded on cloudinary",response.url);
                try {
                    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
                } catch (e) {
                    console.warn('Could not delete temp file:', e.message);
                }
                return response;
        
        } catch (error) {
                console.error("Cloudinary Upload Error:", error);
                try {
                    if (localFilePath && fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
                } catch (e) {
                    console.warn('Could not delete temp file after error:', e.message);
                }
                return null;
    }


 } 

 export  { uploadOnCloudinary}
  


