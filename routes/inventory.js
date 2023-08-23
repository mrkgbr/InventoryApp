var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/categoryController");
const brand_controller = require("../controllers/brandController");
const item_controller = require("../controllers/itemController");
const index_controller = require("../controllers/indexController");

// INVENTORY home //
router.get("/", index_controller.index);

// CATEGORY ROUTES //
router.get("/categories", category_controller.category_list);

// BRAND ROUTES //
router.get("/brands", brand_controller.brand_list);

// ITEM ROUTES //
router.get("/items", item_controller.item_list);

module.exports = router;
