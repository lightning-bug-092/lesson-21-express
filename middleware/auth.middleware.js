var db = require('../db.js')
module.exports.login = function(req,res,next){
  if(!req.signedCookies.usercookie){
    res.redirect('/auth/login');
    return;
  }
  var user = db.get('users').find({id: req.signedCookies.usercookie}).value();
  if(!user){
    res.redirect('/auth/login');
    return;
  }
  res.locals.user = user;
  next();
}