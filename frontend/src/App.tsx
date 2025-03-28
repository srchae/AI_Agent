import "./App.css";

import { InterviewBot } from "./components/InterviewBot";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-content">Hello AI assistant</div>
        <InterviewBot />
      </header>
    </div>
  );
}
