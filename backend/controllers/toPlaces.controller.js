import { toPlaces } from "../models/toPlaces.model.js";
import { FromLocation } from "../models/fromLocation.model.js";
import slugify from "slugify";


export const getAllPlaces = async(req,res)=>{
    try {
        const {locationSlug} = req.params;
        console.log(locationSlug);
        const doesExist = await FromLocation.findOne({locationSlug});
        if(!doesExist){
            return res.status(400).json({
                message:" cannot find the location in our database , first add the location "
            })
        }

        //learn about populate and its importance from here 
        //https://www.geeksforgeeks.org/mongodb/mongoose-populate-method/

        const places = await toPlaces.find({fromLocation: doesExist._id})
                        .populate("fromLocation");

        return res.status(200).json({
        message: "Places fetched successfully",
        data: places
        });


    } catch (error) {
        return res.status(500).json({
        message: "Server error",
        error: error.message
        });
    }
};

export const addPlaceToLocation = async(req,res)=>{
    try{
        const {locationSlug} = req.params;
        const {placeName} = req.body;
        const placeSlug = slugify(placeName,{
            lower : true,
            strict:true,
            trim:true,
        });

        let userId = req.user?._id;
        if(!userId){
            userId = "66f07e5f92c8a31f449fa1c7"// for testing;
        }
        const location = await FromLocation.findOne({ locationSlug });
        if(!location){
            return res.status(400).json("cannot find the location in database");
        }
        const existingPlace = await toPlaces.findOne({
            placeSlug,
            fromLocation:location._id
        });
        if (existingPlace) {
        return res.status(400).json({
            message: "This place already exists for the location"
        });
        }

        const place  = await toPlaces.create({
            placeName,
            placeSlug,
            fromLocation:location._id,
            addedBy:userId
        })

        return res.status(201).json({
            message:"places added to location suuces",
            data: place
        })

    }catch(err){
        res.status(500).json({
        message: "error while adding the place to the location ",
        error: err.message,
        });
    }
}