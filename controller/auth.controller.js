var db = require("../db.js");
const bcrypt = require('bcrypt')
var md5 = require('md5')
var wrong =0;

module.exports.login = function(req,res) {
  res.render("./auth/login.pug");
}
module.exports.postLogin = function(req,res){
  var mail = req.body.mail;
  var password = req.body.password
  const bcrypt = require('bcrypt')
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(req.body.password, salt)
  var user = db.get('users').find({mail: mail}).value();
  if(!user){
    res.render("./auth/login.pug",{
      errors:['user is not exist']
    });
    return;
  }
  
  if(!bcrypt.compareSync(password, user.password)){
    res.render("./auth/login.pug",{
      errors:['wrong password']
    });
    wrong++;
    if(wrong===3){
      wrong=0;
    }
    return;
  }

  res.cookie('usercookie', user.id,{signed:true});

  res.redirect('/users');
}