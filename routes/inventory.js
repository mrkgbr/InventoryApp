var express = require("express");
var router = express.Router();

const category_controller = require("../controllers/categoryController");
const brand_controller = require("../controllers/brandController");

// CATEGORY ROUTES //
router.get("/categories", category_controller.category_list);

// BRAND ROUTES //
router.get("/brands", brand_controller.brand_list);

module.exports = router;
