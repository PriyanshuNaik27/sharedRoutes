import { FromLocation } from "../models/fromLocation.model.js";
import slugify from "slugify";

export const addNewLocation = async (req, res) => {
  try {
    const { locationName } = req.body;

    //this is from where i used slugify
    //https://www.npmjs.com/package/slugify?activeTab=readme

    const locationSlug = slugify(locationName, {
      lower: true,
      strict: true,
      trim: true,
    });
    let userId = req.user?._id; // comes later from JWT
    if (!userId) {
      // use a valid ObjectId from your User collection for testing
      userId = "66f07e5f92c8a31f449fa1c7";
    }

    if (await FromLocation.findOne({ locationSlug })) {
      return res.status(409).json({
        message: "location already exits bro , please search",
      });
    }

    const newLocation = await FromLocation.create({
      locationName: locationName,
      locationSlug: locationSlug,
      uploadedBy: userId,
    });

    return res.status(201).json({
      message: "Location created successfully",
      location: newLocation,
    });
  } catch (err) {
    res.status(500).json({
      message: "error while creating the location ",
      error: err.message,
    });
  }
};


