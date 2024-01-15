import express from "express";
const router = express.Router();
import { getBalance, updateBalance, transferFunds } from "../database.js";

// module.exports = router;

router.get("/getBalance/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const balance = await getBalance(id);
    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
