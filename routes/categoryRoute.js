import express from "express";
import { isAdmin, requireSignIn } from "../middelwares/middelwares.js";
import { createCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// route
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

export default router;