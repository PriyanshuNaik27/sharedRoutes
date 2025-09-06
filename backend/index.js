import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';
const app=express();
app.get('/',(req,res)=>{
     res.send('hello');
});
db.config();

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server is running on PORT',PORT);
});
