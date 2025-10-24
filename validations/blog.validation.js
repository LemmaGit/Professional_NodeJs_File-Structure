const Joi = require("joi");

const createBlogSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

module.exports = {
  createBlogSchema,
};
