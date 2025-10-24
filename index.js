const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/blog.route");
const config = require("./config/config");
const { errorHandler } = require("./middlewares/error");

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
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
