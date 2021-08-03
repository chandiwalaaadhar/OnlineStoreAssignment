const mongoose = require("mongoose");
const ProductSchema = require("../models/ProductsSchema");
const CategorySchema = require("../models/CategoriesSchema");
const config = require("../config");

exports.CreateNewProduct = (req, res) => {
  var product = new ProductSchema({
    prod_name: req.body.product_name,
    prod_description: req.body.description,
    stock: req.body.stock_number,
    features: req.body.features,
    price: req.body.price,
    discounted_price: req.body.discounted_price,
  });
  product.save((err, product) => {
    if (err) {
      return res.json({
        code: 401,
        success: false,
        message: err.message,
        data: {},
      });
    }
    CategorySchema.findByIdAndUpdate(req.body.category_id, {
      $push: {
        products: product._id,
      },
    }).exec();

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
      message: "Product Succesfully Created",
      data: {},
    });
  });
};

exports.GetProductsByCategory = async (req, res) => {
  try {
    category_id = req.query.category_id;
    var products = await CategorySchema.findById(category_id, {
      cat_description: 0,
      _id: 0,
    })
      .populate("products")
      .lean();
    return res.json({
      code: 200,
      success: true,
      message: "Products Retrieved",
      data: products,
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
