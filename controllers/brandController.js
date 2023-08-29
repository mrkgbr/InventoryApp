const asyncHandler = require("express-async-handler");
const Brand = require("../models/brand");
const Item = require("../models/item");

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
