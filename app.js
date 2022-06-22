//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to my personal blog! A very warm welcome to you! It is lovely to have you among us! It is an honor to have such a hardworking fellow like you to join us! Welcome! You are a wonderful person with a wonderful view of life. Your companionship is always an opportunity to learn. A warm welcome to you to join us!";
const aboutContent = "My frst blog created in 2022.";
const contactContent = "Contact Information ⬇️";
const info = "GitHub: AnitaSrbinovska";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let posts = [];
let information = [];

app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    about: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contact: contactContent,
    information: info
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName/", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.get("/post", function(req, res) {
  res.render("post");
});

app.listen(process.envPORT || 3000, function() {
  console.log("Server started on port 3000");
});
