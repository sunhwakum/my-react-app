import { useState } from "react";
import "./Counter.css";

function Counter() {
  const [count, setCount] = useState(0);

  const countColor = count === 0 ? "neutral" : count > 0 ? "positive" : "negative";

  function countUp() {
    setCount(count + 1);
  }

  function countDown() {
    setCount(count - 1);
  }

  function countReset() {
    setCount(0);
  }

  return (
    <div className="counter-card">
      <h2 className="counter-title">🧮 카운터 앱</h2>
      <div className={`counter-number ${countColor}`}>
        <span className="counter-digit">{count}</span>
      </div>
      <div className="counter-message">
        {count >= 10 && "🎉 미션 달성!"}
        {count <= -5 && "⚠️ 너무 많이 줄었어요"}
      </div>
      <div className="counter-buttons">
        <button className="counter-btn" onClick={countUp} disabled={count >= 10}>
          ➕ 증가
        </button>
        <button className="counter-btn" onClick={countDown} disabled={count <= -5}>
          ➖ 감소
        </button>
        <button className="counter-reset" onClick={countReset}>
          🔁 리셋
        </button>
      </div>
    </div>
  );
}

export default Counter;
