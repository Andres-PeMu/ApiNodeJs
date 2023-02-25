const Joi = require("joi");

const id = Joi.number();
const collectionValue = Joi.number();
const id_vencocli = Joi.number();
const id_customer = Joi.number();

const createChargesSchema = Joi.object({
  collectionValue: collectionValue.required(),
  id_vencocli: id_vencocli,
  id_customer: id_customer.required(),
});

const updateChargesSchema = Joi.object({
  collectionValue: collectionValue.required(),
  id_vencocli: id_vencocli,
  id_customer: id_customer.required(),
});

const getChargesSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createChargesSchema,
  updateChargesSchema,
  getChargesSchema,
};
