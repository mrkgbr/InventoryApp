const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  number_of_stock: { type: Number, required: true },
  brand: { type: Schema.ObjectId, ref: "Brand", required: true },
  category: { type: Schema.ObjectId, ref: "Category", required: true },
});

// Virtual for this item instance URL.
ItemSchema.virtual("url").get(function () {
  return "/inventory/item/" + this._id;
});

// Export model.
module.exports = mongoose.model("Item", ItemSchema);
