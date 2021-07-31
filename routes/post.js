var express = require('express');
var router = express.Router();
const Post = require('../models/postMdl').Post;

/* GET all posts listing. */
router.get('/', function (req, res, next) {
  Post.find((err, posts) => {
    res.render('blog', { blogPosts: posts });
  });
});

// Show the create form
router.get('/create', function (req, res, next) {
  res.render('post-create');
});

// To create a new post
router.post('/create', function (req, res, next) {
  // const post = new Post(req.body);
  const post = new Post();
  post.posttitle = req.body.posttitle
  post.postbody = req.body.postbody
  post.posturl = req.body.posturl
  post.save(err => {
    // if(err) throw err;
    if (err) {
      const errorArray = [];
      const errorKeys = Object.keys(err.errors);
      errorKeys.forEach(key => errorArray.push(err.errors[key].message));
      return res.render("post-create", {
        errors: errorArray
      });
    }
    res.redirect("/post");
  });
});

// Shows a single post
router.get('/:purl', function (req, res, next) {
  const psturl = req.params.purl;
  Post.findOne({ posturl: psturl }, (err, post) => {
    res.render('blog-post', { blogPost: post });
  });
});

module.exports = router;
