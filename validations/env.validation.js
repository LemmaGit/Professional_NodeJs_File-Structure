const Joi = require("joi");

const envVarSchema = Joi.object({
  DB_CONNECTION: Joi.string().required(),
  PORT: Joi.number().positive().default(3000),
}).unknown();

module.exports = envVarSchema;
