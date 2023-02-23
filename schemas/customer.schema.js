const Joi = require("joi");

const id = Joi.number();
const name = Joi.string();
const lastName = Joi.string();
const identification = Joi.number();
const email = Joi.string();
const phone = Joi.string();
const id_vencocli = Joi.string();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  identification: identification.required(),
  email: email.required(),
  phone: phone.required(),
  id_vencocli: id_vencocli,
});

const updateCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  identification: identification.required(),
  email: email.required(),
  phone: phone.required(),
  id_vencocli: id_vencocli,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
};
