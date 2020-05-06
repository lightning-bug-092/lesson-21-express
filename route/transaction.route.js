var express = require("express");
var router = express.Router();

var controller = require("../controller/transaction.controller.js");
router.get("/",controller.index)
router.get("/create", controller.create);
router.post("/create", controller.postCreate);
router.get("/:id/complete", controller.complete);
router.post("/:id/complete", controller.postComplete)
module.exports = router;
