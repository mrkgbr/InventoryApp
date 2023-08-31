const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Item = require("../models/item");
const Brand = require("../models/brand");
const Category = require("../models/category");

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name brand")
    .sort({ name: 1 })
    .populate("brand")
    .exec();
  res.render("item_list", { title: "Item List", list_item: allItems });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id)
    .populate("brand")
    .populate("category")
    .exec();

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }
  res.render("item_detail", { title: "Item Detail", detail_item: item });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const [allBrands, allCategories] = await Promise.all([
    Brand.find().exec(),
    Category.find().exec(),
  ]);

  res.render("item_form", {
    title: "Create Item",
    brands: allBrands,
    categories: allCategories,
  });
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  // Validate and sanitize fields.
  body("name", "Title must not be empty.").trim().isLength({ min: 1 }).escape();
  body("description", "Author must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape();
  body("price", "Summary must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape();
  body("brand.*").escape();
  body("category.*").escape();
  // Process request after validation and sanitization.

  // Extract the validation errors from a request.
  const errors = validationResult(req);

  // Create a Book object with escaped and trimmed data.
  const item = new Item({
    name: req.body.product,
    description: req.body.description,
    price: req.body.price,
    number_of_stock: req.body.numberOfStock,
    brand: req.body.brand,
    category: req.body.category,
  });

  if (!errors.isEmpty()) {
    // There are errors. Render form again with sanitized values/error messages.
    // Get all authors and genres for form.
    const [allBrands, allCategories] = await Promise.all([
      Brand.find().exec(),
      Category.find().exec(),
    ]);
    // Mark our selected genres as checked.
    for (const category of allCategories) {
      if (item.category.includes(category._id)) {
        // Current genre is selected. Set "checked" flag.
        category.checked = "true";
      }
    }
    res.render("item_form", {
      title: "Create Item",
      brand: allBrands,
      category: allCategories,
      item: item,
      errors: errors.array(),
    });
  } else {
    // Data from form is valid. Save book.
    await item.save();
    res.redirect(item.url);
  }
});
