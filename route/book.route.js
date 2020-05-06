var express = require("express");
var router = express.Router();

var controller = require('../controller/book.controller.js')
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", controller.postCreate);
router.get("/:id/update", controller.update);
router.get("/:id/delete", controller.delete);
router.post("/:id/update", controller.postUpdate);
router.post("/:id/delete", controller.postDelete);

module.exports = router;
