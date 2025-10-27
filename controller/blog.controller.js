const { StatusCodes } = require("http-status-codes");
const catchAsync = require("./../utils/catchAsync");
const { blogService } = require("../services");

const createBlog = catchAsync(async (req, res) => {
  await blogService.createBlog(req.body);
  res
    .status(StatusCodes.CREATED)
    .send({ success: true, message: "Blog created successfyly" });
});

const getBlogs = catchAsync(async (req, res) => {
  const blogs = await blogService.getBlogs();
  res.status(StatusCodes.OK).json(blogs);
});

module.exports = {
  createBlog,
  getBlogs,
};
