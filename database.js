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

export async function getNotes() {
  try {
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
  } catch (err) {
    console.error(err);
  }
}

export async function getNote(id) {
  try {
    const [rows] = await pool.query(
      `SELECT *
    FROM notes
    WHERE id = ?`,
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error(err);
  }
}

export async function createNote(title, contents) {
  try {
    const [result] = await pool.query(
      `INSERT INTO notes (title, contents)
        VALUES (?, ?)`,
      [title, contents]
    );
    const note = await getNote(result.insertId);
    return note;
  } catch (err) {
    console.error(err);
  }
}

// const notes = await createNote("yo", "yoyo");
// const note = await getNote(1);

// console.log(notes);
