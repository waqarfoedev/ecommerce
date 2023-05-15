import express from "express";
import { isAdmin, requireSignIn } from "../middelwares/middelwares.js";
import {
  createProductsController,
  getProductsController,
  getSingleProductsController,
  productsPhotoController,
  deleteProductController,
  updateProductsController,
  filterProductController,
  productCountController,
  productListContrller,
} from "../controllers/productsController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes

// create product
router.post(
  "/create-products",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductsController
);

// update product
router.put(
  "/update-products/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductsController
);

// get all
router.get("/get-products", getProductsController);

//grt single product
router.get("/get-products/:slug", getSingleProductsController);

//get photo
router.get("/product-photo/:pid", productsPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//filter products
router.post("/filter-products", filterProductController);

// paginati0n
// =============================================
// prdouct count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListContrller);
//===========================================

export default router;
