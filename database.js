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

export async function getBalance(userId) {
  try {
    const [rows] = await pool.query(
      `SELECT balance 
      FROM balances 
      WHERE user_id = ?`,
      [userId]
    );
    return rows[0].balance;
  } catch (err) {
    console.error(err);
  }
}

export async function getUsers() {
  try {
    const [rows] = await pool.query(
      `SELECT * 
      FROM users`
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
    //create zero balance if does not exist for
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
    const balance = await getBalance(userId);
    return balance;
    // return result;
  } catch (err) {
    console.error(err);
  }
}

export async function transferFunds(fromUserId, toUserId, amount) {
  try {
    const fromUserBalance = await getBalance(fromUserId);
    console.log("fromUserBalance", typeof fromUserBalance);
    console.log("amount", typeof amount);
    if (!fromUserBalance || fromUserBalance < amount) {
      console.log("not enough money");
      return false;
    }
    await pool.query("START TRANSACTION");

    await updateBalance(-amount, fromUserId);

    await updateBalance(amount, toUserId);

    await pool.query(
      `INSERT INTO transactions (from_user_id, to_user_id, amount)
       VALUES (?, ?, ?)`,
      [fromUserId, toUserId, amount]
    );

    await pool.query("COMMIT");
    return { success: true, message: "Transfer completed successfully" };
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
    return { success: false, message: "Transfer failed" };
  }
}

// console.log(await getBalance(2));
// const result = await updateBalance(5, 3);
// console.log(result);
// const result = await transferFunds(2, 1, 1);
// console.log("result", result);

// const result = await getUsers();
// console.log("result", result);
