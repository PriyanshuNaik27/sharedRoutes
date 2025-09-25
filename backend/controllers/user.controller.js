import {  z } from "zod";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    // user.save();  we dont use this as we are not passing password which is required field in model
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    console.error("error in token gen ", error.message);
    throw error;
  }
};

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
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(3, { message: "Email is too short" })
      .max(100, { message: "Email is too long" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .max(50, { message: "Password is too long" }),
    userName: z
      .string()
      .min(5, { message: "Username must be at least 5 characters" })
      .max(50, { message: "Username is too long" }),
  });

  const parsedData = requireBody.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      status: 400,
      errors: parsedData.error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  } else {
    try {
      const { email, password, userName } = req.body;

      const existedUser = await User.findOne({ email });
      if (existedUser) {
        console.error("user exits");
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
      const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
        user._id
      );

      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );

      //for cookies - to not make it modifly by frontend
      const options = {
        httpOnly: true,
        secure: true,
      };

      return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
          user: loggedInUser,
          accessToken,
          refreshToken,

          mesage: "user registered  succesfulyy",
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
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

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    //for cookies - to not make it modifly by frontend
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,

        mesage: "user logged in succesfulyy",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "user logout succesfulyy",
      });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging out.",
    });
  }
};
