import express from "express";
import balanceRouter from "./routes/balance.js";

const app = express();

app.use(express.json());

app.use("/balance", balanceRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
