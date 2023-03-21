import { hashpassword } from "../helpers/authHelper.js";
import userModel from '../models/userModels.js'

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