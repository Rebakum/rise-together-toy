import express from "express";
import cors from "cors";
import router from "./routers/index"

const app = express();

app.use(cors());
app.use(express.json());

// MAIN ROUTE
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

export default app;
