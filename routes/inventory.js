const express = require("express");

const router = express.Router();

const category_controller = require("../controllers/categoryController");
const brand_controller = require("../controllers/brandController");
const item_controller = require("../controllers/itemController");
const index_controller = require("../controllers/indexController");

// INVENTORY home //
router.get("/", index_controller.index);

// CATEGORY ROUTES //
router.get("/categories", category_controller.category_list);
router.get("/category/create", category_controller.category_create_get);
router.get("/category/:id", category_controller.category_detail);

// BRAND ROUTES //
router.get("/brands", brand_controller.brand_list);
router.get("/brand/create", brand_controller.brand_create_get);
router.get("/brand/:id", brand_controller.brand_detail);

// ITEM ROUTES //
router.get("/items", item_controller.item_list);
router.get("/item/create", item_controller.item_create_get);
router.post("/item/create", item_controller.item_create_post);
router.get("/item/:id", item_controller.item_detail);

module.exports = router;
