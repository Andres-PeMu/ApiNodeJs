const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

const create = async (data) => {
  const query = `INSERT INTO public."TRABAJADORES"("IDENTIFICACION", "NOMBRE", "APELLIDO", "CORREO", "ID_SECTOR")
                 VALUES (${data.identification}, '${data.name}', '${data.lastName}', '${data.email}', ${data.id_sectors})`;
  await sequelize.query(query);
  return data;
};

const find = async () => {
  const query = `SELECT "ID_TRABAJADORES", "IDENTIFICACION", "NOMBRE", "APELLIDO", "CORREO", "ID_SECTOR"
                 FROM public."TRABAJADORES"`;
  const [data] = await sequelize.query(query);
  return data;
};

const findOne = async (id) => {
  const query = `SELECT "ID_TRABAJADORES", "IDENTIFICACION", "NOMBRE", "APELLIDO", "CORREO", "ID_SECTOR"
                 FROM public."TRABAJADORES"
                 WHERE "ID_TRABAJADORES" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("sector not found");
  }
  return data;
};

const update = async (id, changes) => {
  const queryDate = `UPDATE public."TRABAJADORES" 
                     SET "IDENTIFICACION"=${changes.identification}, "NOMBRE"='${changes.name}', 
                         "APELLIDO"='${changes.lastName}', "CORREO"='${changes.email}', 
                         "ID_SECTOR"=${changes.id_sectors}
                     WHERE "ID_TRABAJADORES"=${id}`;
  await sequelize.query(queryDate);
  const query = `SELECT "ID_TRABAJADORES", "IDENTIFICACION", "NOMBRE", "APELLIDO", "CORREO", "ID_SECTOR"
                 FROM public."TRABAJADORES"
                 WHERE "ID_TRABAJADORES" = ${id}`;;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("sector not found");
  }
  return data;
};

const deleteOne = async (id) => {
  const queryDate = `DELETE FROM public."TRABAJADORES" WHERE "ID_TRABAJADORES"=${id}`;
  await sequelize.query(queryDate);
  return { id };
};

module.exports = { create, find, findOne, update, deleteOne };
