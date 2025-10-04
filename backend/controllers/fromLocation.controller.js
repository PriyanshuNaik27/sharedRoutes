import { FromLocation } from "../models/fromLocation.model.js";
import slugify from "slugify";
import { uploadBufferToCloudinary } from "../utils/cloudinary.js";

export const addNewLocation = async (req, res) => {
  try {
    const { locationName } = req.body;

    /*/\s/g is a regular expression:
    \s matches any whitespace character (spaces, tabs, newlines, etc.).
    g is the "global" flag, ensuring that all occurrences of whitespace are replaced, not just the first one. */

    const locationSlug = locationName.toLowerCase().replace(/\s/g, '');
    
    //this is from where i used slugify
    //https://www.npmjs.com/package/slugify?activeTab=readme

    // const locationSlug = slugify(locationName, {
    //   lower: true,
    //   strict: true,
    //   trim: true,
    // });
    const userId = req.user?._id; 
    if (!userId) {
      return res.status(400).json({
        message: "didnnot foujnd user id ,login !! "
      })
    }

    if (await FromLocation.findOne({ locationSlug })) {
      return res.status(409).json({
        message: "location already exits bro , please search",
      });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      const cloudinaryResult = await uploadBufferToCloudinary(req.file.buffer);
      if (cloudinaryResult) {
        imageUrl = cloudinaryResult.secure_url;
      }
    }

    const newLocation = await FromLocation.create({
      locationName: locationName,
      locationSlug: locationSlug,
      uploadedBy: userId,
      image: imageUrl,
    });

    return res.status(201).json({
      message: "Location created successfully",
      data: newLocation,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while creating the location ",
      error: err.message,
    });
  }
};


export const recentLocation = async(req,res)=>{
  try{
    const recentLocations = await FromLocation.find().sort({createdAt:-1}).limit(6);
    // console.log(recentLocations.length);
    
    return res.status(201).json({
      data:recentLocations
    })
    
  }catch(err){
    res.status(400).json({
      message:"error while fetching recent location",
      error: err.message
    })
  }
}

export const allLocations = async(req,res) =>{
  try {
    const locactions = await FromLocation.find();
    if(locactions.length ===0){
      res.status(400).json({
        message:"no location are present"
      })
    }

    res.status(200).json({
      message:"location succesfuly sended",
      data : locactions
    })
  } catch (err) {
    res.status(400).json({
      message:"error while sending all the locations",
      error: err.message
    })
  }
}
