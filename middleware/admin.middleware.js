var db = require('../db')
module.exports.admin = function(req,res,next){
  var user = db.get('users').find({id: req.signedCookies.usercookie}).value();
  if(user.isAdmin===true){
    res.redirect('/users');
    return;
  }
  next();
}