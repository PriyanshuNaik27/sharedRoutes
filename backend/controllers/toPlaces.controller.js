import { toPlaces } from "../models/toPlaces.model";
import { FromLocation } from "../models/fromLocation.model";

export const getAllPlaces = async(req,res)=>{
    try {
        const {locationSlug} = req.params;

        const doesExist = FromLocation.findOne({locationSlug});
        if(!doesExist){
            return res.status(400).json({
                message:" cannot find the location in our database , first add the location "
            })
        }

        const places = FromLocation.fin

    } catch (error) {
        
    }
}