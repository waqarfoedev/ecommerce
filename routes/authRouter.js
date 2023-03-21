import express from "express";
import {registerController, loginController} from '../controllers/authController.js'

//router object
const router=express.Router( )

//routing
//Register || Method Post
router.post('/register', registerController)

//Login || Method Post
router.post('/login', loginController)

export default router