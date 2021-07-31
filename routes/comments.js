var express = require("express");
var router = express.Router();
// const { User } = require("../models/user");
const comment = require("../models/contactMdl").comment;

/* GET all comments listing. */

router.get("/", function (req, res, next) {
 
  comment
    .find()
    
    .exec(function (err, comments) {
      console.log(comments);
      if (err) throw err;
      res.render("comments", { contcomments: comments });
    });
});

// Show all comments for given username
router.get("/auth/:uname", function (req, res, next) {
  // Using the given username paramter, find the user(auther) object from the DB
  // Use the user _id from the user object, to find all comments for the _id
  User.findOne({ username: req.params.uname }, (err, author) => {
    if (err) return processErrors(err, "comments", req, res);
    comment.find({ user: author._id }, (err, comments) => {
      if (err) return processErrors(err, "comments", req, res);
      res.render("comments-author", {
        user: author.username,
        authorcomments: comments,
      });
    });
  });
});

// middleware that is specific to this router,
// checks that the user must be logged in
router.use((req, res, next) => {
  //console.log('Time: ', Date.now());
  if (!req.user) res.status(403).redirect("/");
  //else if (req.user.role != "agent") res.status(403).redirect("/");
  else next();
});

function processErrors(errs, pageTemplate, req, res) {
  // If there are errors from the Model schema
  const errorArray = [];
  const errorKeys = Object.keys(errs.errors);
  errorKeys.forEach((key) => errorArray.push(errs.errors[key].message));
  return res.render(pageTemplate, {
    ...pageRegister,
    errors: errorArray,
    ...req.body,
  });
}

// Show the create form
router.get("/create", function (req, res, next) {
  res.render("post-create");
});



// Shows a single post
router.get("/:purl", function (req, res, next) {
  const psturl = req.params.purl;
  Post.findOne({ posturl: psturl }, (err, post) => {
    res.render("blog-post", { blogPost: post });
  });
});

module.exports = router;
