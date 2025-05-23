import { useState } from 'react';

export default function DobotusPrototype() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleAsk = async () => {
    setAnswer("Thinking...");

    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>ドボタス AI Q&A</h2>
      <textarea
        rows="4"
        cols="60"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <br />
      <button onClick={handleAsk}>質問する</button>
      <p>🧠 回答: {answer}</p>
    </div>
  );
}
