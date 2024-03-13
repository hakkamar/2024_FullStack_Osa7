const router = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

//const userExtractor = require("../utils/middleware").userExtractor;
//const logger = require("../utils/logger");

router.get("/comments", async (request, response) => {
  const comments = await Comment.find({}).populate("blog", {
    title: 1,
    author: 1,
  });
  response.json(comments);
});

//router.post("/:id/comments", userExtractor, async (request, response) => {
router.post("/:id/comments", async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  //logger.info("post comment - body", body);
  //logger.info("post comment - id", id);

  const comment = new Comment(body);
  comment.blog = id;

  const blog = await Blog.findOne({ _id: id });
  blog.comments = blog.comments.concat(comment._id);

  await blog.save();

  const savedComment = await comment.save();

  response.status(201).json(savedComment);
});

router.delete("/:id/comments", async (request, response) => {
  const comment = await Comment.findById(request.params.id);
  if (!comment) {
    return response.status(204).end();
  }
  await comment.deleteOne();

  response.status(204).end();
});

module.exports = router;
