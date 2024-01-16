import express from "express";
const router = express.Router();
import { getUsers } from "../database.js";

router.get("/getUsers", async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
