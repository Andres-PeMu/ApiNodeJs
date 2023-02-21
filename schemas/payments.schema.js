const Joi = require("joi");

const id = Joi.number();
const paymentValue = Joi.number();
const idWorker = Joi.number();
const idOperationalExpenses = Joi.number();

const createPaymentsSchema = Joi.object({
  paymentValue: paymentValue,
  idWorker: idWorker.required(),
  idOperationalExpenses: idOperationalExpenses.required(),
});

const updatePaymentSchema = Joi.object({
  paymentValue: paymentValue,
  idWorker: idWorker.required(),
  idOperationalExpenses: idOperationalExpenses.required(),
});

const getPaymentSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPaymentsSchema,
  updatePaymentSchema,
  getPaymentSchema,
};
