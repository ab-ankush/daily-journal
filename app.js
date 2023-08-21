const express = require("express");
const bodyParser = require("body-parser");
// const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Post = require("./models/post");
const StartingContent = require("./models/startingContent");
const dotenv = require("dotenv");

dotenv.config();

const dbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/blogDB";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongoose connection open");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const posts = await Post.find({});
  const homeStartingContent = await StartingContent.findOne({
    titlee: "Home",
  });

  res.render("home", { homeStartingContent, posts });
});

app.get("/about", async (req, res) => {
  const aboutContent = await StartingContent.findOne({
    title: "About",
  });

  res.render("about", { aboutContent });
});

app.get("/contact", async (req, res) => {
  const contactContent = await StartingContent.findOne({
    title: "Contact",
  });

  res.render("contact", { contactContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.post("/compose", (req, res) => {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent,
  });

  post.save();

  res.redirect("/");
});

app.get("/post/:postId", async (req, res) => {
  const id = req.params.postId;
  const post = await Post.findById(id);

  res.render("post", { post });
});

app.delete("/post/:postId", async (req, res) => {
  const id = req.params.postId;
  await Post.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
