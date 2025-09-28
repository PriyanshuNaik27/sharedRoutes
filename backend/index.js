import express from 'express';

//first config all from env;
import dotenv from 'dotenv';
dotenv.config();
console.log("My secret key is:", process.env.ACCESS_TOKEN_SECRET);

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

