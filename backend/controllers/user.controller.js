
import {z} from 'zod';
import { User } from '../models/user.models';


const registerUser = async(req,res)=>{
    //signup 

/*
 take email
 take password 
 check if email is present or not 
 if not present create a new user 
 return res;

 //zod validition

*/

    const requireBody = z.object({
        email : z.email().min(3).max(100),
        password: z.string().min(1).max(50),
        userName: z.string().min(5).max(50)
    });

    const parsedData = requireBody.safeParse(req.body);

    if(!parsedData.success){
        return res.json({
            status :400,
            message:"invalid input fields - error in registerUser"
        })
    }
    else{
        const {email,password,userName} = req.body;

        const existedUser = User.findOne(email);
        if(existedUser){
            return res.json({
                status:404,
                message:"user is already exits"
            })
        }

        const user = await User.create({
            userName : userName.toLowerCase(),
            email : email,
            password : password,
        });

        // check if user is created or not
        
    }
}