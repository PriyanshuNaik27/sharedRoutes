// 1. THIS MUST BE THE VERY FIRST LINE
// This creates the side-effect of loading .env immediately
import 'dotenv/config'; 

import express from 'express';


import './config/passport.js'; 

import app from "./app.js";
import connect from "./config/db.js";
import fs from 'fs';
import path from 'path';

// Debugging check (This will now work correctly)
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);

const PORT = process.env.PORT || 8000;

connect()
.then(() => {
    // Ensure temp upload directory exists
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    try {
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
            console.log('Created temp upload directory:', tempDir);
        }
    } catch (e) {
        console.warn('Could not create temp upload directory:', e.message);
    }
    
    app.listen(PORT, () => {
        console.log('Server is running on PORT', PORT);
    });
})
.catch((err) => {
    console.log("MONGO DB connection failed ", err);
});