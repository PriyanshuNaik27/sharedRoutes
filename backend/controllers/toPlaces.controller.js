import { toPlaces } from "../models/toPlaces.model";
import { FromLocation } from "../models/fromLocation.model";

export const getAllPlaces = async(req,res)=>{
    try {
        const {locationSlug} = req.params;

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