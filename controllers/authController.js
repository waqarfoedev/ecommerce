import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import userModel from '../models/userModels.js';
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address, answer } = req.body;
        //validation 
        if (!username) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "email is Required" });
        }
        if (!password) {
            return res.send({ message: "password is Required" });
        }
        if (!phone) {
            return res.send({ message: "phone is Required" });
        }
        if (!address) {
            return res.send({ message: "address is Required" });
        }
        if (!answer) {
            return res.send({ message: "favorite city is Required" });
        }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.this.status(200).send({
                success: false,
                message: 'Already Register Please Login',
            });
        }
        //register user 
        const hashedpassword = await hashpassword(password);
        //save
        const user = await new userModel({ username, email, phone, address, answer, password: hashedpassword }).save();

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }

};

// login Controller
export const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(200).send({
                success: false,
                message: "Invalid email or password"
            });
        }
        //check user
        const userr = await userModel.findOne({ email });
        if (!userr) {
            return res.status(200).send({
                success: false,
                message: 'Email not register'
            });
        }

        const match = await comparePassword(password, userr.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            });
        }

        //token 
        const token = await JWT.sign(
            { _id: userr._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" });

        res.status(201).send({
            success: true,
            message: "login successfully",
            user: {
                _id: userr._id,
                username: userr.username,
                email: userr.email,
                phone: userr.phone,
                address: userr.address
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        });
    }
};

// forgot password controller
export const forgetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email) {
            return res.status(400).send({ message: "email is Required" });
        }
        if (!newPassword) {
            return res.status(400).send({ message: "new password is Required" });
        }
        if (!answer) {
            return res.status(400).send({ message: "answer is Required" });
        }
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer"
            });
        }
        const hashed = await hashpassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: 'Password reset Successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Some thing went wrong in forgot password',
            error
        });
    }
};

// test cntriloler
export const testController = (req, res) => {
    res.send('Route protected');
};