import express from "express";
import {registerController, testController, loginController} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middelwares/middelwares.js";

//router object
const router=express.Router( )

//routing
//Register || Method Post
router.post('/register', registerController)

//Login || Method Post
router.post('/login', loginController)

//test routes
router.get('/test', requireSignIn, isAdmin, testController)
export default router