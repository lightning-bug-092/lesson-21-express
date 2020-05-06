var express = require("express");
var multer  = require('multer')


var router = express.Router();

var controller = require('../controller/user.controller.js');
var validateUser = require('../validate/user.validate.js');
var upload = multer({ dest: './public/uploads/' })
 
router.get("/", controller.index);
router.get("/create", controller.create);
router.get("/:id/profile/update", controller.update);
router.get("/:id/delete", controller.delete);
router.get("/:id/profile", controller.profile);

router.post("/create",validateUser.postCreate, controller.postCreate);
router.post("/:id/profile/update",upload.single('avatar'),controller.postUpdate);
router.post("/:id/delete", controller.postDelete);
module.exports = router;