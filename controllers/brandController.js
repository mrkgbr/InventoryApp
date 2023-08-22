const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

// Display list of all Category.
exports.brand_list = asyncHandler(async (req, res, next) => {
  const allBrands = await Brand.find().sort({ name: 1 }).exec();
  res.render("brand_list", {
    title: "Brand List",
    list_brands: allBrands,
  });
});
