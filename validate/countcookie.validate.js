var express = require('express')
var cookieParser = require('cookie-parser')
 
var app = express()
app.use(cookieParser())
var count=0;
module.exports.countCookie = function(req,res,next){
  if(req.cookies){
      if(req.cookies.hieu ==='hehe'){
        count++;
        console.log(req.cookies.hieu,':',count);
      }
  }
  
  next()
}