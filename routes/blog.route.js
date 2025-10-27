const { Router } = require("express");
const { blogController } = require("./../controller");
const validate = require("./../middlewares/validate");
const { blogValidation } = require("./../validations");

const router = Router();

router.get("/blogs", blogController.getBlogs);
router.post(
  "/blog",
  validate(blogValidation.createBlogSchema),
  blogController.createBlog
);

module.exports = router;
