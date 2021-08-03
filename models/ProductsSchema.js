const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsModel = Schema({
  prod_name: { type: String, required: true },
  prod_img: { type: String, required: true },
  features: [String],
  price: { type: Number, required: true },
  discounted_price: { type: Number, required: true },
  description: String,
  stock: { type: Number, required: true },
});

module.exports = mongoose.model(
  "Products",
  ProductsModel,
  "productsCollection"
);
