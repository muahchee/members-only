import { pool } from "./pool.js";
import format from "pg-format";

// export async function getAllItems() {
//   const sql =
//     "SELECT item.id, name, buyprice, sellprice, t1.themename AS theme1, t2.themename AS theme2, s1.sourcename AS source1, s2.sourcename AS source2, url FROM item LEFT JOIN source s1 ON item.sourceid1 = s1.id LEFT JOIN source s2 ON item.sourceid2 = s2.id LEFT JOIN hhatheme t1 ON item.themeid1 = t1.id LEFT JOIN hhatheme t2 ON item.themeid2 = t2.id ORDER BY item.id;";

//   const { rows } = await pool.query(sql);
//   return rows;
// }

export async function addUser(obj) {
  const sql =
    "INSERT INTO users (firstname, lastname, username, pw, member, admin) VALUES ($1, $2, $3, $4, false, false)";

  await pool.query(sql, [obj.firstname, obj.lastname, obj.username, obj.pw]);
}

export async function getUserbyUsername(username) {
  const sql = format("SELECT * FROM users WHERE username LIKE %L", username);

  const { rows } = await pool.query(sql);
  return rows[0];
}
