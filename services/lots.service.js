const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

const create = async (data) => {
  if (data.lotValue && data.id_customer) {
    const query = `INSERT INTO public."LOTES"("NUMERO_LOTE", "VALOR_LOTE", "ID_SECTOR", "ID_CLIENTE") 
    VALUES (${data.lotNumber}, ${data.lotValue}, ${data.id_sector}, ${data.id_customer})`;
    await sequelize.query(query);
  } else {
    const query = `INSERT INTO public."LOTES"("NUMERO_LOTE", "ID_SECTOR") 
    VALUES (${data.lotNumber}, ${data.id_sector})`;
    await sequelize.query(query);
  }
  return data;
};

const find = async () => {
  const query =
    'SELECT "ID_LOTES", "NUMERO_LOTE", "VALOR_LOTE", "ID_SECTOR", "ID_CLIENTE" FROM public."LOTES"';
  const [data] = await sequelize.query(query);
  return data;
};

const findOne = async (id) => {
  const query = `SELECT "ID_LOTES", "NUMERO_LOTE", "VALOR_LOTE", "ID_SECTOR", "ID_CLIENTE" FROM public."LOTES" WHERE "ID_LOTES" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("sector not found");
  }
  return data;
};

const update = async (id, changes) => {
  if (changes.lotValue && changes.id_customer) {
    const query = `UPDATE public."LOTES"
                   SET "NUMERO_LOTE"=${changes.lotNumber}, "VALOR_LOTE"=${changes.lotValue}, 
                   "ID_SECTOR"=${changes.id_sector}, "ID_CLIENTE"=${changes.id_customer}
                   WHERE "ID_LOTES"=${id}`;
    await sequelize.query(query);
  } else {
    const query = `UPDATE public."LOTES"
                   SET "NUMERO_LOTE"=${changes.lotNumber}, "ID_SECTOR"=${changes.id_sector}
                   WHERE "ID_LOTES"=${id}`;
    await sequelize.query(query);
  }
  const query = `SELECT "ID_LOTES", "NUMERO_LOTE", "VALOR_LOTE", "ID_SECTOR", "ID_CLIENTE" FROM public."LOTES" WHERE "ID_LOTES" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("lot not found");
  }
  return data;
};

const deleteOne = async (id) => {
  const queryDate = `DELETE FROM public."LOTES" WHERE "ID_LOTES"=${id}`;
  await sequelize.query(queryDate);
  return { id };
};

module.exports = { create, find, findOne, update, deleteOne };
