// 유저테이블에서 유저 정보 조회
const isUserSql = "SELECT * FROM login_account WHERE phone=$1";

// ci테이블에서 유저 정보 조회
const isCiSql = "SELECT * FROM user_ci WHERE ci=$1";

// ci테이블에 유저 값 넣기
const insertCiSql =
  "INSERT INTO user_ci(phone,name,ci,provider) VALUES($1,$2,$3,$4)";

module.exports = { isUserSql, isCiSql, insertCiSql };
