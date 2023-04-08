import express from 'express';
import { isAdmin, requireSignIn } from '../middelwares/middelwares.js';
import {
    createProductsController,
    getProductsController,
    getSingleProductsController,
    productsPhotoController,
    deleteProductController,
} from '../controllers/productsController.js';
import formidable from 'express-formidable';

const router = express.Router();

// routes

// create product
router.post('/create-products', requireSignIn, isAdmin, formidable(), createProductsController);

// get all
router.get('/get-products', getProductsController);

//grt single product
router.get('/get-products/:slug', getSingleProductsController);

//get photo
router.get('/product-photo/:pid', productsPhotoController);

//delete product
router.delete('/product/:pid', deleteProductController);

export default router;