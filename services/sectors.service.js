const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");


const create = async (data) => {
  const query = `INSERT INTO public."SECTORS"("NAME", "NUMERO_LOTE") VALUES ('${data.name}', ${data.lotNumber})`;
  await sequelize.query(query);
  return data;
};

const find = async () => {
  const query = 'SELECT "ID_SECTOR", "NAME", "NUMERO_LOTE" FROM public."SECTORS"';
  const [data] = await sequelize.query(query);
  return data;
};

const findOne = async (id) => {
  const query = `SELECT "ID_SECTOR", "NAME", "NUMERO_LOTE" FROM public."SECTORS" WHERE "ID_SECTOR" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("sector not found");
  }
  return data;
};

const update = async (id, changes) => {
  const queryDate = `UPDATE public."SECTORS" SET "NAME"='${changes.name}', "NUMERO_LOTE"=${changes.lotNumber} WHERE "ID_SECTOR"=${id}`;
  await sequelize.query(queryDate);
  const query = `SELECT "ID_SECTOR", "NAME", "NUMERO_LOTE" FROM public."SECTORS" WHERE "ID_SECTOR" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("sector not found");
  }
  return data;
};

const deleteOne = async (id) => {
  const queryDate = `DELETE FROM public."SECTORS" WHERE "ID_SECTOR"=${id}`;
  await sequelize.query(queryDate);
  return { id };
};

module.exports = { create, find, findOne, update, deleteOne };
