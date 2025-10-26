process.on("uncaughtException", (err) => {
  process.exit(1);
});

const config = require("./config/config");
const mongoose = require("mongoose");
const http = require("http");
const app = require("./server");

mongoose
  .connect(config.dbConnection)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.error(err);
  });

const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
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
