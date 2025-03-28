// import dotenv from "dotenv";
// import OpenAI from "openai";
// import readline from "readline";
// import typia from "typia";

// import { Agentica } from "@agentica/core";

// import { DateTool, InterviewQuestionTool, WeatherTool } from "./tools";

// // .env 파일을 env 불러온다.
// dotenv.config();

// async function agent() {
//   // OpenAI를 정의
//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

//   // Agentica를 사용하여 agent를 생성
//   const agent = new Agentica({
//     model: "chatgpt",
//     vendor: {
//       model: "gpt-4o-mini",
//       api: openai,
//     },

//     /**
//      * controllers: Agentica에서 LLM이 Tool을 사용할 수 있도록 연결해주는 컨트롤러 등록 공간
//      */
//     controllers: [
//       {
//         name: "Date Tool",
//         protocol: "class",
//         application: typia.llm.application<DateTool, "chatgpt">(),
//         execute: new DateTool(),
//       },
//       {
//         name: "Weather Tool",
//         protocol: "class",
//         application: typia.llm.application<WeatherTool, "chatgpt">(),
//         execute: new WeatherTool(),
//       },
//       {
//         name: "Interview Question Tool",
//         protocol: "class",
//         application: typia.llm.application<InterviewQuestionTool, "chatgpt">(),
//         execute: new InterviewQuestionTool(),
//       },
//     ],
//   });

//   // 터미널에서 대화를 주고 받기 위한 인터페이스 생성
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   // Agent와 대화하는 함수
//   const conversation = () => {
//     rl.question(
//       "대화를 시작해보세요! (대화를 종료하려면 exit를 입력) : ",
//       async (input) => {
//         // 사용자가 exit를 입력하면 대화 종료
//         if (input === "exit") {
//           rl.close();
//           return;
//         }

//         const answers = await agent.conversate(input);

//         // Agent의 답변을 console.log로 출력
//         answers.forEach((answer) => {
//           console.log(JSON.stringify(answer, null, 2));
//         });

//         // 대화를 지속할 수 있도록 재귀적 호출
//         conversation();
//       }
//     );
//   };

//   conversation();
// }

// agent().catch(console.error);
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
