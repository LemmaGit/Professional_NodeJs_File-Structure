const Blog = require("./../models/blog.model");
const catchAsync = require("./../utils/catchAsync");

const createBlog = catchAsync(async (req, res) => {
  await Blog.create(req.body);
  res.send({ success: true, message: "Blog created successfyly" });
});

const getBlogs = catchAsync(async (req, res) => {
  HTMLElementr();
  const blogs = await Blog.find({});
  res.json(blogs);
});

module.exports = {
  createBlog,
  getBlogs,
};
