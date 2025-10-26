process.on("uncaughtException", (err) => {
  process.exit(1);
});

const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/blog.route");
const config = require("./config/config");
const { errorHandler, errorConvertor } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const app = express();

mongoose
  .connect(config.dbConnection)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());
app.use(router);
app.use((req, res, next) =>
  next(new ApiError(StatusCodes.NOT_FOUND, "Not found"))
);
app.use(errorConvertor);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

process.on("unhandledRejection", (err) => {
  if (server) {
    server.close(() => {
      console.log("Server is closed.");
      process.exit(1);
    });
  } else process.exit(1);
});
