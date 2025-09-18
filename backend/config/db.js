import mongoose from "mongoose";

const connect = async()=>{
    try{
        const mongoUrl = process.env.MONGO_URI;
        if(!process.env.MONGO_URI){
        console.log("MONGo URL is not present in the env");
}
        const connectionInstance = await mongoose.connect(mongoUrl);
        console.log(`connected to mongodb with `);
    }catch(error){
        console.error("error while connecting to mongo db",error);
        process.exit(1);
    }
}

export default connect;