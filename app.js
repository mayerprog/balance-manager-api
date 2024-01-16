import express from "express";
import cors from "cors";
import balanceRouter from "./routes/balance.js";
import usersRouter from "./routes/users.js";

const app = express();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use("/balance", balanceRouter);
app.use("/users", usersRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
