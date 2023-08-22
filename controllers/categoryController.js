const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// Display list of all Category.
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Category List",
    list_categories: allCategories,
  });
});
