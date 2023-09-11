const asyncHandler = require("express-async-handler");
const Brand = require("../models/brand");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

// Display list of all Category.
exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().sort({ name: 1 }).exec();
  res.render("brand_list", {
    title: "Brand List",
    list_brands: allBrands,
  });
});

exports.brand_detail = asyncHandler(async (req, res, next) => {
  const [brand, itemsInBrand] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Item.find({ brand: req.params.id }).exec(),
  ]);

  if (brand === null) {
    // no result
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("brand_detail", {
    brand: brand,
    brand_items: itemsInBrand,
  });
});

exports.brand_create_get = (req, res, next) => {
  res.render("brand_form", { title: "Create Brand" });
};

exports.brandCreatePost = [
  // Validate and sanitize
  body("name", "Brand name must contain at least 1 characters")
    .trim()
    .notEmpty({
      ignore_whitespace: true,
    })
    .escape(),
  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a brand object with validated data
    const brand = new Brand({ name: req.body.name });
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("category_form", {
        title: "Create Brand",
        brand,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Brand with same name (case insensitive) already exists.
      const brandExists = await Brand.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (brandExists) {
        // Genre exists, redirect to its detail page.
        res.redirect(brandExists.url);
      } else {
        await brand.save();
        // New category saved. Redirect to category detail page.
        res.redirect(brand.url);
      }
    }
  }),
];

exports.brandDeleteGet = asyncHandler(async (req, res, next) => {
  const [brand, brandsInItem] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Item.find({ brand: req.params.id }, "name").exec(),
  ]);

  if (brand === null) res.redirect("/inventory/brands");

  res.render("brand_delete", {
    title: "Delete Brand",
    brand,
    brand_items: brandsInItem,
  });
});

exports.brandDeletePost = asyncHandler(async (req, res, next) => {
  const [brand, brandsInItem] = await Promise.all([
    Brand.findById(req.params.id).exec(),
    Item.find({ brand: req.params.id }, "name").exec(),
  ]);

  if (brandsInItem.length > 0) {
    res.render("brand_delete", {
      title: "Delete Brand",
      brand,
      brand_items: brandsInItem,
    });
    return;
  } else {
    await Brand.findByIdAndDelete(req.params.id);
    res.redirect("/inventory/brands");
  }
});
