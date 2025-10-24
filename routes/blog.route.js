const { Router } = require("express");
const { createBlog, getBlogs } = require("./../controller/blog.controller");

const router = Router();

router.get("/blogs", getBlogs);
router.post("/blog", createBlog);

module.exports = router;
