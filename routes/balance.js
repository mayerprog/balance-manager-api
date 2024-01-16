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
    const id = req.params.id;
    const balance = await updateBalance(amount, id);

    res.status(201).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/transferFunds", async (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;
    console.log("fromUserId", fromUserId);
    const result = await transferFunds(fromUserId, toUserId, amount);
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
