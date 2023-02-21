const express = require("express");

const SectorsRouter = require('./sectors.reuter');
const WorkersRouter = require('./workers.router');
const LotsRouter = require('./lots.router');

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use('/sectors', SectorsRouter)
  router.use('/workers', WorkersRouter)
  router.use('/lots', LotsRouter)
}

module.exports = routerApi;
