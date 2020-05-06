var db = require("../db.js");
var shortId = require("shortid");
module.exports.index = function(req, res) {
  var userId = req.signedCookies.usercookie;
  var transactions = db.get("transactions").filter({userId:userId}).value();
  var books=[];
  for(var transaction of transactions)
  books.push(db.get('books').find({id: transaction.bookId}).value());
   var page = parseInt(req.query.page) || 1;
    if(page*4>db.get('transactions').value().length)
        page = parseInt(db.get('transactions').value().length/4)+1;
    var perPage = 4;
    var begin = (page-1)*perPage;
    var end = page*perPage;
  res.render("./transactions/index.pug", {
    transactions: transactions.slice(begin,end),
     books : books.slice(begin,end),
    pageNumber: page
  });
}
module.exports.create = function(req, res) {
  var books = db.get("books").value();
  var users = db.get("users").value();
  res.render("./transactions/create.pug", {
    books: books,
    users: users
  });
};
module.exports.postCreate = function(req, res) {
  req.body.id = shortId.generate();
  req.body.isComplete =false;
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("/transactions");
};
module.exports.complete = function(req,res){
  res.render('./transactions/complete.pug')
}
module.exports.postComplete = function(req,res){
  var id = req.params.id;
  var err=[];
  if(!db.get("transactions")
    .find({ id: id }).value())
    err.push('id does not exist');
  if(err.length){
    res.render('./transactions/complete.pug',{
      err:err
    })
    return;
  }
  db.get("transactions")
    .find({ id: id })
    .assign({ isComplete: req.body.isComplete })
    .write();
  res.redirect("/transactions");
}
