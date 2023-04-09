import fs from 'fs';
import productModels from '../models/productModels.js';
import slugify from 'slugify';

export const createProductsController = async (req, res) => {

    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is required" });
            case !description:
                return res.status(500).send({ message: "Description is required" });
            case !price:
                return res.status(500).send({ message: "Price is required" });
            case !category:
                return res.status(500).send({ message: "Category is required" });
            case !quantity:
                return res.status(500).send({ message: "Quantity is required" });
            case photo && photo.size > 10000000:
                return res.status(500).send({ message: "Photo is required and size should be less then 1mb" });
        }

        const products = new productModels({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();

        res.status(201).send({
            success: true,
            message: "Products created successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating products",
            error
        });
    }
};

// get all products
export const getProductsController = async (req, res) => {
    try {
        const products = await productModels
            .find({})
            .populate('category')
            .select('-photo')
            .limit(12).
            sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: " all products",
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while get all products",
            error
        });
    }
};

//get Single products
export const getSingleProductsController = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await productModels
            .findOne({ slug })
            .populate('category')
            .select('-photo');
        res.status(200).send({
            success: true,
            message: " get single product",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while get single products",
            error
        });
    }
};

//get photo 
export const productsPhotoController = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModels.findById(pid).select('photo');

        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while get photo",
            error
        });
    }
};

//delete product
export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        await productModels.findByIdAndDelete(pid).select('-photo');
        res.status(200).send({
            success: true,
            message: " product deleted successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error
        });
    }
};

// update product
export const updateProductsController = async (req, res) => {

    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        const { pid } = req.params;

        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is required" });
            case !description:
                return res.status(500).send({ message: "Description is required" });
            case !price:
                return res.status(500).send({ message: "Price is required" });
            case !category:
                return res.status(500).send({ message: "Category is required" });
            case !quantity:
                return res.status(500).send({ message: "Quantity is required" });
            case photo && photo.size > 10000000:
                return res.status(500).send({ message: "Photo is required and size should be less then 1mb" });
        }

        const products = await productModels.findByIdAndUpdate(pid, { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();

        res.status(201).send({
            success: true,
            message: "Products update successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating products",
            error
        });
    }
};