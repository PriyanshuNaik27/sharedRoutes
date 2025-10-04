import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })

        console.log("result",result.url);

        return result;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.error("error while uploading on cloudinary",error);
        return null;
    }
}

// New function to upload from buffer (for multer memory storage)
export const uploadBufferToCloudinary = async (buffer) => {
    try {
        if (!buffer) return null;

        const result = await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${buffer.toString('base64')}`,
            {
                resource_type: "auto",
                folder: "shared-routes/locations" // Optional: organize images in folders
            }
        );

        console.log("Cloudinary upload result:", result.url);
        return result;
    } catch (error) {
        console.error("Error while uploading to Cloudinary:", error);
        return null;
    }
}