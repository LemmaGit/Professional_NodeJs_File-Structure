const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const config = require("./../config/config");
const ApiError = require("./../utils/ApiError");

const errorConvertor = (err, req, res, next) => {
  let error = err;
  if (!err instanceof ApiError) {
    // means not intentionally thrown by next()
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || StatusCodes[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (config.env === "production" && !err.isOperational) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = StatusCodes[statusCode];
  }
  res.locals.errorMessage = message;

  const response = {
    error: true,
    code: statusCode,
    message,
    ...(config.env === "development" && { stack: err.stack }),
  };
  if (config.env === "development") console.log(err);

  res.status(statusCode).send(response);
};

module.exports = { errorHandler, errorConvertor };
