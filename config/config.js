const Joi = require("joi");
require("dotenv").config();

const envVarSchema = Joi.object({
  DB_CONNECTION: Joi.string().required(),
  PORT: Joi.number().positive().default(3000),
}).unknown();

const { value: envVars, error } = envVarSchema.validate(process.env);

if (error) console.log(error);

module.exports = {
  port: envVars.PORT,
  dbConnection: envVars.DB_CONNECTION,
};
