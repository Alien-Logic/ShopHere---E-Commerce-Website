import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import prodRoutes from "./routs/ProductRoutes.js"

import authRoutes from "./routs/AuthRoutes.js";
//connect to db
mongoose.connect("mongodb://127.0.0.1:27017/project")
.then(()=> console.log("MongoDB connected"))
.catch(()=> console.log("database connection error"))
const PORT = 9999;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/product", prodRoutes);



//no route match
app.use((req, res) => {
    console.log(req.params)
    res.json({"err":1, "msg": "No route found"});
})

app.listen(PORT, (err)=>{
    if(err) throw err;
    else console.log(`server work on ${PORT}`)
})
