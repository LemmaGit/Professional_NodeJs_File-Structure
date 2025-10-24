const { Router } = require("express");
const { createBlog, getBlogs } = require("./../controller/blog.controller");
const validate = require("./../middlewares/validate");
const { createBlogSchema } = require("../validations/blog.validation");

const router = Router();

router.get("/blogs", getBlogs);
router.post("/blog", validate(createBlogSchema), createBlog);

module.exports = router;
