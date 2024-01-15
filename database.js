import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getBalance(user_id) {
  try {
    const [rows] = await pool.query(
      `SELECT balance 
      FROM balances 
      WHERE user_id = ?`,
      [user_id]
    );
    return rows;
  } catch (err) {
    console.error(err);
  }
}

export async function updateBalance(amount, userId) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM balances WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0) {
      await pool.query(
        `INSERT INTO balances (user_id, balance)
        VALUES (?, ?)`,
        [userId, 0.0]
      );
    }
    const [result] = await pool.query(
      `UPDATE balances
      SET balance = balance + ?
      WHERE user_id = ?`,
      [amount, userId]
    );
    return result;
  } catch (err) {
    console.error(err);
  }
}

// const notes = await createNote("yo", "yoyo");
// const note = await getNote(1);

console.log(await updateBalance(-500, 2));
