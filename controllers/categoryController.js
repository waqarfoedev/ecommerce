import categoryMoel from "../models/categoryMoel.js";
import slugify from "slugify";

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