const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

// Virtual for this category instance URL.
CategorySchema.virtual("url").get(() => `/inventory/category/${this._id}`);

// Export model.
module.exports = mongoose.model("Category", CategorySchema);
