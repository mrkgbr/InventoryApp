const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  year_of_foundation: { type: Number },
});

// Virtual for this brand instance URL.
BrandSchema.virtual("url").get(function () {
  return `/inventory/brand/${this._id}`;
});

// Export model.
module.exports = mongoose.model("Brand", BrandSchema);
