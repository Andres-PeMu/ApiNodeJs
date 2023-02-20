const Joi = require("joi");

const id = Joi.number();
const identification = Joi.number();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(15);
const email = Joi.string().email();
const id_sectors = Joi.number();

const createWorkersSchema = Joi.object({
  identification: identification.required(),
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  id_sectors: id_sectors.required(),
});

const updateWorkersSchema = Joi.object({
  identification: identification.required(),
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  id_sectors: id_sectors.required(),
});

const getWorkersSchema = Joi.object({
  id: id.required(),
});

module.exports = { createWorkersSchema, updateWorkersSchema, getWorkersSchema };
