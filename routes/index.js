const express = require("express");

const SectorsRouter = require('./sectors.reuter');

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use('/sectors', SectorsRouter)
}

module.exports = routerApi;
