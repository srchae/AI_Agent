import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express";

import { createAgent } from "./tools/agent";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(express.json());

const agent = createAgent();

app.post("/api/chat", async (req: Request, res: Response) => {
  const { input } = req.body;
  const result = await agent.conversate(input);
  res.json(result);
});

app.get("/", (req: Request, res: Response) => {
  res.send("서버가 정상적으로 동작됩니다.");
});

app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});
