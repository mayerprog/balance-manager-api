import express from "express";
const router = express.Router();
import { getBalance, updateBalance, transferFunds } from "../database.js";

router.get("/getBalance/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const balance = await getBalance(id);
    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/updateBalance/:id", async (req, res) => {
  try {
    const { amount } = req.body;
    const amountNum = parseInt(amount);
    const id = req.params.id;
    const balance = await updateBalance(amountNum, id);

    res.status(201).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/transferFunds", async (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;
    const amountNum = parseInt(amount);
    const result = await transferFunds(fromUserId, toUserId, amountNum);
    console.log("result", result);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
