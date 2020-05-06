var db = require("../db.js");
var shortId = require('shortid');
module.exports.index = function(req, res) {
  var books = db.get("books").value();
  res.render("./books/books.pug", {
    books: books
  });
}
module.exports.create = function(req, res) {
  res.render("./books/create.pug");
};
module.exports.update = function(req, res) {
  res.render("./books/update.pug");
};
module.exports.delete = function(req, res) {
  var id = req.params.id;
  var book = db
    .get("books")
    .find({ id: id })
    .value();
  res.render("./books/delete.pug", {
    book: book
  });
}
module.exports.postCreate = function(req, res) {
  req.body.id = shortId.generate(); 
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};
module.exports.postUpdate = function(req, res) {
  var id = req.params.id;
  db.get("books")
    .find({ id: id })
    .assign({ description: req.body.description })
    .write();
  res.redirect("/books");
};
module.exports.postDelete = function(req, res) {
  var id = req.params.id;
  db.get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books");
};