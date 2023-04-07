import express from "express";
import { isAdmin, requireSignIn } from "../middelwares/middelwares.js";
import { createCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// route
// create category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

// update category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

export default router;