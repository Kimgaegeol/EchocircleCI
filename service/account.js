const client = require("./../db/db");
const { isUserSql, isCiSql, insertCiSql } = require("./../db/query");

const isCi = async (ci) => {
  try {
    const result = await client.query(isCiSql, [ci]);
    if (result.rows.length == 0) {
      return false;
    } else return true;
  } catch (e) {
    console.log(e);
  }
};

const isUser = async (phone) => {
  try {
    const result = await client.query(isUserSql, [phone]);
    if (result.rows.length == 0) return false;
    else return true;
  } catch (e) {
    console.log(e);
  }
};

const insertCi = async (phone, name, ci, provider) => {
  try {
    const result = await client.query(insertCiSql, [phone, name, ci, provider]);
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { isCi, isUser, insertCi };
