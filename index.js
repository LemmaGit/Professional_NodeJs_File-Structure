process.on("uncaughtException", (err) => {
  console.error(err, "💥");
  process.exit(1);
});

const config = require("./config/config");
const mongoose = require("mongoose");
const http = require("http");
const app = require("./server");
const logger = require("./config/logger");

mongoose
  .connect(config.dbConnection)
  .then(() => {
    logger.info("Connected to Mongodb");
  })
  .catch((err) => {
    logger.error(err);
  });

const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});
process.on("unhandledRejection", (err) => {
  logger.error(err);
  if (server) {
    server.close(() => {
      logger.info("Server is closed.");
      process.exit(1);
    });
  } else process.exit(1);
});
