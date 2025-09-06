import express from 'express';
const router=express.Router();
router.post('register',(req,res)=>{
    res.send('register route');
});
router.post('/Login',(req,res)=>{
    res.send('Login route');
});
router.post('/logout',(req,res)=>{
    res.send('logout route');
});
router.get('profile',(req,res)=>{
    res.send('profile route');
});