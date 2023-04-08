import express from 'express';
import { isAdmin, requireSignIn } from '../middelwares/middelwares.js';
import { createProductsController } from '../controllers/productsController.js';
import formidable from 'express-formidable';

const router = express.Router();

// routes

router.post('/create-products', requireSignIn, isAdmin, formidable(), createProductsController);


export default router;