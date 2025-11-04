import { pool } from "./pool.js";
import format from "pg-format";


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

export async function getUserById(id) {
  const sql = format("SELECT * FROM users WHERE id=%s;", id);
  const { rows } = await pool.query(sql);
  return rows[0];
}

export async function changeMembership(username) {
  const target = await getUserbyUsername(username);
  if (target.member === false) {
    const sql = format(
      "UPDATE users SET member=true WHERE username LIKE %L",
      username
    );
    await pool.query(sql);
  } else {
    const sql = format(
      "UPDATE users SET member=false WHERE username LIKE %L",
      username
    );
    await pool.query(sql);
  }
}

