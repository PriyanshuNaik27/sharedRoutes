import { z } from "zod";
import { User } from "../models/user.models";
import bcrypt from "bcrypt";


export const registerUser = async (req, res) => {
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
    email: z.email().min(3).max(100),
    password: z.string().min(1).max(50),
    userName: z.string().min(5).max(50),
  });

  const parsedData = requireBody.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      status: 400,
      message: "invalid input fields - error in registerUser",
    });
  } else {
    const { email, password, userName } = req.body;

    const existedUser = User.findOne(email);
    if (existedUser) {
      return res.json({
        status: 404,
        message: "user is already exits",
      });
    }

    const user = await User.create({
      userName: userName.toLowerCase(),
      email: email,
      password: password,
    });

    // check if user is created or not
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

