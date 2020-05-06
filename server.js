// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
require('dotenv').config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var userRoute = require('./route/user.route.js')
var bookRoute = require('./route/book.route.js')
var transactionRoute = require("./route/transaction.route");
var authRoute = require("./route/auth.route");

var authMiddleware = require('./middleware/auth.middleware');
var adminMiddleware = require('./middleware/admin.middleware');


var count = require('./validate/countcookie.validate.js')
const cookieParser = require('cookie-parser');

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser('heiu'));
app.get("/",function(req, res) {
  res.render("index.pug");
});
app.use('/auth',authRoute);
app.use('/users',authMiddleware.login,userRoute);
app.use('/books',authMiddleware.login,bookRoute);
app.use("/transactions",authMiddleware.login,adminMiddleware.admin, transactionRoute);


// https://expressjs.com/en/starter/basic-routing.html
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
