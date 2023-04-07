import categoryMoel from "../models/categoryMoel.js";
import slugify from "slugify";


// create category controller
export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(401).send({
                message: "Category name is Require"
            });
        }

        const exisitingCategory = await categoryMoel.findOne({ name });
        if (exisitingCategory) {
            res.status(200).send({
                success: true,
                message: "Category already exisite."
            });
        }

        const category = await new categoryMoel({
            name,
            slug: slugify(name),
        }).save();

        res.status(201).send({
            success: true,
            message: "category created successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in category",
            error
        });

    }
};

// update category controller
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryMoel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            success: true,
            message: "category update successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating",
            error
        });
    }
};

// get cat
export const categoryController = async (req, res) => {
    try {
        const category = await categoryMoel.find({});
        res.status(200).send({
            success: true,
            message: "categories get successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting categories",
            error
        });
    }
};

// get single category
export const singleCategoryController = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await categoryMoel.findOne({ slug });
        res.status(200).send({
            success: true,
            message: "single category get successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting single categories",
            error
        });
    }
};

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryMoel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "category delete successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while delete categories",
            error
        });
    }
};