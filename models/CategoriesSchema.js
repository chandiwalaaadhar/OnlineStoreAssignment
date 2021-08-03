const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesModel = Schema({
  cat_name: { type: String, required: true },
  cat_img: { type: String, required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
});

module.exports = mongoose.model(
  "Categories",
  CategoriesModel,
  "categoriesCollection"
);
