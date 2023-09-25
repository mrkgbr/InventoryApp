const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");
const brandController = require("../controllers/brandController");
const itemController = require("../controllers/itemController");
const indexController = require("../controllers/indexController");

// INVENTORY home //
router.get("/", indexController.index);

// CATEGORY ROUTES //
router.get("/categories", categoryController.category_list);
router.get("/category/create", categoryController.category_create_get);
router.post("/category/create", categoryController.category_create_post);
router.get("/category/:id/delete", categoryController.category_delete_get);
router.post("/category/:id/delete", categoryController.category_delete_post);
//TODO implement update POST
router.get("/category/:id/update", categoryController.categoryUpdateGet);
router.get("/category/:id", categoryController.category_detail);

// BRAND ROUTES //
router.get("/brands", brandController.brand_list);
router.get("/brand/create", brandController.brand_create_get);
router.post("/brand/create", brandController.brandCreatePost);
router.get("/brand/:id/delete", brandController.brandDeleteGet);
router.post("/brand/:id/delete", brandController.brandDeletePost);
//TODO implement update POST
router.get("/brand/:id/update", brandController.brandUpdateGet);
router.get("/brand/:id", brandController.brand_detail);

// ITEM ROUTES //
router.get("/items", itemController.item_list);
router.get("/item/create", itemController.item_create_get);
router.post("/item/create", itemController.item_create_post);
router.get("/item/:id/delete", itemController.itemDeleteGet);
router.post("/item/:id/delete", itemController.itemDeletePost);
//TODO implement update POST
router.get("/item/:id/update", itemController.itemUpdateGet);
router.get("/item/:id", itemController.item_detail);

module.exports = router;
