import express from 'express';

//first config all from env;
import dotenv from 'dotenv';
console.log("Before config:", process.env.CLOUDINARY_API_KEY); // should be undefined
dotenv.config();
console.log("After config:", process.env.CLOUDINARY_API_KEY);  // should show your key


import app from  "./app.js";
import connect from "./config/db.js";


const PORT=process.env.PORT || 8000;

connect()
.then(()=>{
    app.listen(PORT,()=>{
    console.log('server is running on PORT',PORT);
});
}).catch((err)=>{
    console.log("MONGO DB connection failed ",err);
})

