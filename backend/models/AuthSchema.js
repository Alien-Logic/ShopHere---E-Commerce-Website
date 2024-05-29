import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    role:{
      type:String,
      required:true,
      default:"user"  
    }

},{timestamps:true});
const authModel=mongoose.model("auth", authSchema);

export default authModel;