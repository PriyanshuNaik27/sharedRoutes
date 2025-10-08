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

       const response = await cloudinary.uploader.upload( localFilePath,{
            resource_type: "auto"
        })
        // console.log("file is uploaded on cloudinary",response.url);
        fs.unlinkSync(localFilePath)
        return response ;
        
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        fs.unlinkSync(localFilePath) 
         // remove the loacaly savved temporay file as the upload operation got faiied ,,smjha 
        return null ;
    }


 } 

 export  { uploadOnCloudinary}
  


