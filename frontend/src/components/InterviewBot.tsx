import "../App.css";

import { useState } from "react";

import { SendHorizontal } from "lucide-react";

export const InterviewBot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { type: "user" | "bot"; text: string }[]
  >([]);

  const handleSend = async () => {
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      const answer = data.map((res: any) => res.text).join("\n");
      console.log("answer::", answer);
      setMessages((prev) => [...prev, { type: "bot", text: answer }]);
      setInput("");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "답변을 불러오는데 문제가 발생했습니다." + err },
      ]);
    }
  };

  return (
    <div className="App-main-content">
      <div className="output-wrapper custom-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.type === "user"
                ? "human-interview-input"
                : "ai-interview-output"
            }
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.type === "user" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="wrapper">
        <input
          className="interview-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="무엇이든 물어보세요"
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend} className="send-button">
          <SendHorizontal stroke="#60e46a" />
        </button>
      </div>
    </div>
  );
};
