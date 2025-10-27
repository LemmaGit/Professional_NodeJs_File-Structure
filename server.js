const express = require("express");
const router = require("./routes/blog.route");
const { errorHandler, errorConvertor } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { StatusCodes } = require("http-status-codes");
const morgan = require("./config/morgan");
const app = express();

app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express.json());
app.use(router);
app.use((req, res, next) =>
  next(new ApiError(StatusCodes.NOT_FOUND, "Not found"))
);
app.use(errorConvertor);
app.use(errorHandler);

module.exports = app;
