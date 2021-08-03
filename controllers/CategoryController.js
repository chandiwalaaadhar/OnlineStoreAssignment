const mongoose = require("mongoose");
const CategorySchema = require("../models/CategoriesSchema");

exports.CreateNewCategory = (req, res) => {
  var category = new CategorySchema({
    cat_name: req.body.category_name,
    cat_description: req.body.description,
    cat_img: req.file.key,
  });
  category.save((err, category) => {
    if (err) {
      return res.json({
        code: 401,
        success: false,
        message: err.message,
        data: {},
      });
    }
    return res.json({
      code: 200,
      success: true,
      message: "Category Succesfully Created",
      data: {},
    });
  });
};

exports.ViewCategories = async (req, res) => {
  try {
    var categories = await CategorySchema.find({}, { products: 0 }).lean();
    return res.json({
      code: 200,
      success: true,
      message: "Categories Retrieved",
      data: categories,
    });
  } catch (err) {
    return res.json({
      code: 401,
      success: false,
      message: err.message,
      data: {},
    });
  }
};

exports.SearchCategory = (req, res) => {
  query = req.query.query;
  CategorySchema.find(
    { cat_name: { $regex: query, $options: "i" } },
    (err, category) => {
      if (err)
        return res.json({
          code: 401,
          success: false,
          message: err.message,
          data: {},
        });
      return res.json({
        code: 200,
        success: true,
        message: "Search Results Found",
        data: category,
      });
    }
  );
};
