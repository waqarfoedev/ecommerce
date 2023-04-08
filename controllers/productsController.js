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

        res.status(200).send({
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