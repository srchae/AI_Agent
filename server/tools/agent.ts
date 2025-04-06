import OpenAI from "openai";
import typia from "typia";

import { Agentica } from "@agentica/core";

import { DateTool, InterviewQuestionTool, WeatherTool } from "./tools";

export const createAgent = () => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  return new Agentica({
    model: "chatgpt",
    vendor: {
      model: "gpt-4o-mini",
      api: openai,
    },
    /**
     * controllers: Agentica에서 LLM이 Tool을 사용할 수 있도록 연결해주는 컨트롤러 등록 공간
     */
    controllers: [
      {
        name: "Date Tool",
        protocol: "class",
        application: typia.llm.application<DateTool, "chatgpt">(),
        execute: new DateTool(),
      },
      {
        name: "Weather Tool",
        protocol: "class",
        application: typia.llm.application<WeatherTool, "chatgpt">(),
        execute: new WeatherTool(),
      },
      {
        name: "Interview Question Tool",
        protocol: "class",
        application: typia.llm.application<InterviewQuestionTool, "chatgpt">(),
        execute: new InterviewQuestionTool(),
      },
    ],
  });
};
