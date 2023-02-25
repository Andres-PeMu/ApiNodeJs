const Joi = require("joi");

const id = Joi.number();
const salesValue = Joi.number();
const id_lots = Joi.number();
const id_customer = Joi.number();
const id_vencocli = Joi.number();

const createSalesSchema = Joi.object({
  salesValue: salesValue.required(),
  id_lots: id_lots.required(),
  id_vencocli: id_vencocli,
  id_customer: id_customer.required(),
});

const updateSalesSchema = Joi.object({
  salesValue: salesValue.required(),
  id_lots: id_lots.required(),
  id_vencocli: id_vencocli,
  id_customer: id_customer.required(),
});

const getSalesSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createSalesSchema,
  updateSalesSchema,
  getSalesSchema,
};