const Category = require('../models/Category');

const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
};

const createCategory = async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
};

module.exports = { getCategories, createCategory };