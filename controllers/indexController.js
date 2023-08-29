const asyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Brand = require("../models/brand");
const Category = require("../models/category");

exports.index = asyncHandler(async (req, res, next) => {
  const [numItems, numBrands, numCategories] = await Promise.all([
    Item.countDocuments({}).exec(),
    Brand.countDocuments({}).exec(),
    Category.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Inventory Home",
    item_count: numItems,
    brand_count: numBrands,
    category_count: numCategories,
  });
});
