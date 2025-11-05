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

export async function changeAdminStatus(username) {
  const target = await getUserbyUsername(username);
  if (target.admin === false) {
    const sql = format(
      "UPDATE users SET admin=true WHERE username LIKE %L",
      username
    );
    await pool.query(sql);
  } else {
    const sql = format(
      "UPDATE users SET admin=false WHERE username LIKE %L",
      username
    );
    await pool.query(sql);
  }
}

export async function getAllMessages() {
  const sql = "SELECT * FROM messages;";

  const { rows } = await pool.query(sql);
  return rows;
}

export async function addMessage(obj) {
  const sql =
    "INSERT INTO messages (userid, title, timestamp, text) VALUES ($1, $2, $3, $4)";

  await pool.query(sql, [obj.userid, obj.title, obj.timestamp, obj.text]);
}

export async function deleteMessage(msgId) {
  const sql = format("DELETE FROM item WHERE id=%s;", msgId);

  await pool.query(sql);
}
