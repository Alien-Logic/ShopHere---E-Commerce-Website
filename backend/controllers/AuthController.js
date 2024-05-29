import authModel from "../models/AuthSchema.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import crypto from 'crypto' ;
const secretKey = crypto.randomBytes(94).toString('hex');

const salt = bcrypt.genSaltSync(10);

const signIn = (req, res)=> {
    const{email, password}=req.body;
    authModel.findOne({email:email})
    .then(data=>{
        console.log(data)
        const val = bcrypt.compareSync(password, data.password);
        console.log(val)
        if(bcrypt.compareSync(password, data.password)){
            console.log("Right")
            let payload={
                fullName: `${data.firstName} ${data.lastName }`,
                email: data.email,
                isAdmin:data.role =='admin'?true:false
            }
            console.log(payload)
            const token =jwt.sign(payload, secretKey,{expiresIn:'5h'});
            res.json({"err":0, "msg":"Login success", "_token":token})
        }
        else{
            
            res.json({"err":1, "msg":"Email or password is not correct"})
        }
    })
    .catch(err=> res.json({"err":1, "msg":"Email or password is not correct"}))
}

const signUp = (req, res) =>{

    const{email, password, firstName, lastName, mobile}=req.body;
    const hash = bcrypt.hashSync(password, salt);
    let newUser= new authModel({email:email, password:hash,firstName:firstName,lastName:lastName,mobile:mobile});
    newUser.save()
    .then(data=> res.json({"err":0, "msg":"user registerd"}))
    
    .catch(err=> res.json({"err":1, "msg":"already exists or something went wrong!", "error": err}))
}

export {signIn, signUp };