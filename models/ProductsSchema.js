const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsModel = Schema({
  prod_name: { type: String, required: true },
  features: [String],
  price: { type: Number, required: true },
  discounted_price: { type: Number, required: true },
  prod_description: String,
  stock: { type: Number, required: true },
});

ProductsModel.methods.buy = function () {
  this.stock -= 1;
  this.save();
};

module.exports = mongoose.model(
  "Products",
  ProductsModel,
  "productsCollection"
);
