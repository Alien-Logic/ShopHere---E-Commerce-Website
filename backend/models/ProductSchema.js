import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },

    category:{
        type:String,
        required:true,
          
      }, 
      
    price:{
        type:Number,
        required:true
    },
    
    quantity:{
        type:Number,
        required:true
    },
    features:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    }
   

},{timestamps:true});
const prodModel=mongoose.model("product", prodSchema);

export default prodModel;