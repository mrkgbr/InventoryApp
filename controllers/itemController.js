const Item = require("../models/item");
const Brand = require("../models/brand");
const Category = require("../models/category");

const asyncHandler = require("express-async-handler");

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name brand")
    .sort({ name: 1 })
    .populate("brand")
    .exec();
  res.render("item_list", { title: "Item List", list_item: allItems });
});
