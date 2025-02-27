import userModels from "../models/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req ,res)=>{
    try{
        const {username, email, password} = req.body;
    
        const existUser = await userModels.findOne({email});
        if(existUser) return res.status(400).json({message :"user email already exists"});

        const hashPassword = await bcrypt.hash(password,10);

        const newUser = userModels({username,email,password:hashPassword});
        newUser.save();
    
        return res.status(200).json({success:true, message:"user registered successfully",newUser});

    }
    catch(error){
        return res.status(500).json({success:true,message:"user registration failed",error});
    }
};

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
    
        if(!email || !password) return res.status(400).json({message : "all fields are required"});
    
        const user = await userModels.findOne({email});
        if(!user) return res.status(404).json({message : "user not found"});

        const isValidPass = await bcrypt.compare(password , user.password);
        if(!isValidPass){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({userId : user._id,email:user.email},process.env.SECRET_KEY,{expiresIn:"3d"});
        
        return res.status(200).json({success:true, message :"Login Successfull",user:user,token:token});
        
    }
    catch(error){
        console.error("Login error",error);
        return res.status(500).json({sucess:false,message : "login Failed"});
    }
};