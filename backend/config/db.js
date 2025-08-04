import mongoose from "mongoose";


if(!process.env.MONGO_URI){
    console.log("MONGo URL is not present in the env");
}
const mongoUrl = process.env.MONGO_URI;

const connect = async()=>{
    try{
        const connectionInstance = await mongoose.connect(mongoUrl);
        console.log(`connected to mongodb with ${connectionInstance}`);
    }catch(error){
        console.error("error while connecting to mongo db",error);
        process.exit(1);
    }
}

export default connect;