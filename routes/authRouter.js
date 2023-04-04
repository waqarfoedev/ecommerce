import express from "express";
import {
    registerController,
    testController,
    loginController,
    forgetPasswordController
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from "../middelwares/middelwares.js";

//router object
const router = express.Router();

//routing
//Register || Method Post
router.post('/register', registerController);

//Login || Method Post
router.post('/login', loginController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

//protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//forget password route auth
router.post('/forget-password', forgetPasswordController);

export default router;