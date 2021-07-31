var express = require('express');
var router = express.Router();

var greeting = require('../public/mf-module');
var moment = require('moment');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { mygreeting: greeting.greeting(), language: greeting.lang(), date: moment().format("dddd, MMMM Do YYYY"), time: moment().format("h:mm:ss a")});
});

router.get("/about", (req,res,next) => {
  res.render("about")
})


module.exports = router;
