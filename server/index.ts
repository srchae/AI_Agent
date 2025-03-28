import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { createAgent } from "./tools/agent";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const agent = createAgent();

app.post("/api/chat", async (req, res) => {
  const { input } = req.body;
  const result = await agent.conversate(input);
  res.json(result);
});

app.get("/", (req, res) => {
  res.send("서버가 정상적으로 동작됩니다.");
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
