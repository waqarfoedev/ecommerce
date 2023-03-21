import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import userModel from '../models/userModels.js'
import  JWT  from "jsonwebtoken";

export const registerController = async(req, res)=>{
    try {
        const {username, email, password, phone, address}=req.body
        //validation 
        if(!username){
            return res.send({error: "Name is Required"})
        }
        if(!email){
            return res.send({error: "email is Required"})
        }
        if(!password){
            return res.send({error: "password is Required"})
        }
        if(!phone){
            return res.send({error: "phone is Required"})
        }
        if(!address){
            return res.send({error: "address is Required"})
        }
        //check user
        const exisitingUser= await userModel.findOne({email})
        //exisiting user
        if(exisitingUser){
            return res.this.status(200).send({
                success: false,
                message:'Already Register Please Login',
        })}
        //register user 
        const hashedpassword= await hashpassword(password)
        //save
        const user=await new userModel({username, email,  phone, address, password: hashedpassword}).save()

        res.status(201).send({
            success:true,
            message:'User Register Successfully',
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration', 
            error
        })
    }

}

export const loginController= async(req, res)=>{
try {
    
    const {email, password}=req.body
        //validation
        if(!email || !password){
          return res.status(404).send({
            success: false,
           error: "Invalid email or password"
        })
        }
        //check user
        const userr=await userModel.findOne({email})
        if(!userr){
            return res.status(404).send({
                success: false,
                message: 'Email not register'
        })
        }

        const match= await comparePassword(password, userr.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
        })
        }

        //token 
        const token= await JWT.sign(
            {_id: userr._id}, 
            process.env.JWT_SECRET,
            { expiresIn:"7d" })

        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                _id: userr._id,
                username: userr.username,
                email: userr.email,
                phone: userr.phone,
                address: userr.address
            },
            token,
        })

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in login',
        error
    })
}  
}