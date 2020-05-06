var db = require("../db.js");
var md5 = require('md5');
const bcrypt = require('bcrypt')
var shortId = require('shortid');
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports.index = function(req, res) {
  var users = db.get("users").value();
  res.render("./users/users.pug", {
    users: users
  });
}
module.exports.create = function(req, res) {
  res.render("./users/create.pug");
};
module.exports.update = function(req, res) {
  res.render("./users/update.pug");
};
module.exports.delete = function(req, res) {
  var id = req.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();
  res.render("./users/delete.pug", {
    user: user
  });
}
module.exports.profile = function(req,res){
  res.render("./users/profile.pug",{
    user: db.get('users').find({id: req.params.id}).value()
  })
}
module.exports.postCreate = function(req, res) {
  req.body.id = shortId.generate();
  req.body.avatarUrl = "https://res.cloudinary.com/minhhieu092/image/upload/v1588216119/ujlew3dksexo3vg99koj.png";
  req.body.isAdmin = false;
  var salt = bcrypt.genSaltSync(10)
  req.body.password= bcrypt.hashSync(req.body.password, salt)
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};
module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  
   const data = {
      image: req.file.path
    }
    cloudinary.uploader.upload(data.image, function(error, result) {
      db.get("users")
    .find({ id: id })
    .assign({ avatarUrl: result.url })
    .write();
    res.redirect("/users");
  });

  
};
module.exports.postDelete = function(req, res) {
  var id = req.params.id;
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};