const asyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

// Display list of all Category.
exports.category_list = asyncHandler(async (req, res, next) => {
  const allCategories = await Category.find().sort({ name: 1 }).exec();
  res.render("category_list", {
    title: "Category List",
    list_categories: allCategories,
  });
});

// Display detail page for a specific Category
exports.category_detail = asyncHandler(async (req, res, next) => {
  const [category, itemInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({ category: req.params.id }).exec(),
  ]);

  if (category === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("category_detail", {
    category,
    category_items: itemInCategory,
  });
});

exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Create Category" });
};
