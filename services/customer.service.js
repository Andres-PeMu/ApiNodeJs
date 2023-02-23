const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

const create = async (data) => {
  const query = `INSERT INTO public."CLIENTES"(
                  "NOMBRE", "APELLIDO", "IDENTIFICACION", "CORREO", "TELEFONO")
                  VALUES ('${data.name}', '${data.lastName}', ${data.identification}, '${data.email}', '${data.phone}');`;
  await sequelize.query(query);
  return data;
};

const find = async () => {
  const query = `SELECT "ID_CLIENTES", "NOMBRE", "APELLIDO", "IDENTIFICACION", "CORREO", "ID_VENCOCLI", "TELEFONO"
	             FROM public."CLIENTES"`;
  const [data] = await sequelize.query(query);
  return data;
};

const findOne = async (id) => {
  const query = `SELECT "ID_CLIENTES", "NOMBRE", "APELLIDO", "IDENTIFICACION", "CORREO", "ID_VENCOCLI", "TELEFONO"
                 FROM public."CLIENTES" 
                 WHERE "ID_CLIENTES" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("customer not found");
  }
  return data;
};

const update = async (id, changes) => {
  const query = `UPDATE public."CLIENTES"
	                SET "NOMBRE"='${changes.name}', "APELLIDO"='${changes.lastName}', "IDENTIFICACION"=${changes.identification}, 
                  "CORREO"='${changes.email}', "TELEFONO"='${changes.phone}'
                  WHERE "ID_CLIENTES"=${id}`;
  await sequelize.query(query);
  const selecQuery = `SELECT "ID_CLIENTES", "NOMBRE", "APELLIDO", "IDENTIFICACION", "CORREO", "ID_VENCOCLI", "TELEFONO"
                        FROM public."CLIENTES" 
                        WHERE "ID_CLIENTES" = ${id}`;
  const [data] = await sequelize.query(selecQuery);
  if (!data[0]) {
    throw boom.notFound("customer not found");
  }
  return data;
};

const deleteOne = async (id) => {
  const queryDate = `DELETE FROM public."CLIENTES" WHERE "ID_CLIENTES"=${id}`;
  await sequelize.query(queryDate);
  return { id };
};

module.exports = { create, find, findOne, update, deleteOne };
