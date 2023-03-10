const express = require("express");

const SectorsRouter = require('./sectors.reuter');
const WorkersRouter = require('./workers.router');
const LotsRouter = require('./lots.router');
const operacionalExpenses = require('./operationalExpenses.router');
const payments = require('./payments.router');
const customer = require('./customer.router');
const charges = require('./charges.router');
const sales = require('./sales.router');

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use('/sectors', SectorsRouter)
  router.use('/workers', WorkersRouter)
  router.use('/lots', LotsRouter)
  router.use('/oe', operacionalExpenses)
  router.use('/payments', payments)
  router.use('/customer', customer)
  router.use('/charges', charges)
  router.use('/sales', sales)
}

module.exports = routerApi;
