// Test script to verify image upload functionality
import { uploadBufferToCloudinary } from './utils/cloudinary.js';
import fs from 'fs';

// Test function
async function testCloudinaryUpload() {
    try {
        console.log('Testing Cloudinary configuration...');
        
        // Check if environment variables are loaded
        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            console.error('❌ CLOUDINARY_CLOUD_NAME not found in environment variables');
            return;
        }
        
        console.log('✅ Environment variables loaded');
        console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        
        // Test with a sample image (you can replace this with any image file)
        const testImagePath = './public/temp/test-image.jpg';
        
        if (!fs.existsSync(testImagePath)) {
            console.log('ℹ️  No test image found. Create a test image at:', testImagePath);
            console.log('   Or test with a real image upload through your API');
            return;
        }
        
        // Read test image
        const imageBuffer = fs.readFileSync(testImagePath);
        
        // Upload to Cloudinary
        console.log('📤 Uploading test image to Cloudinary...');
        const result = await uploadBufferToCloudinary(imageBuffer);
        
        if (result) {
            console.log('✅ Upload successful!');
            console.log('📷 Image URL:', result.secure_url);
        } else {
            console.log('❌ Upload failed');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testCloudinaryUpload();
