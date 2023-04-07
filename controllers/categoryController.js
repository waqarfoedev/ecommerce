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