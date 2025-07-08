import "./Counter.css";
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const countColor =
    count === 0 ? "neutral" : count > 0 ? "positive" : "negative";

  function countUp() {
    setCount(count + 1); // count상태(값) 1증가, 컴포넌트 리렌더링
  }

  function countDown() {
    setCount(count - 1); // count상태(값) 1감소, 컴포넌트 리렌더링
  }

  function countReset() {
    setCount(0); // count상태(값) 0으로 변경, 컴포넌트 리렌더링
  }

  return (
    <>
      <div className="container">
        <h2>🧮 카운터 앱</h2>
        <div className={`display ${countColor}`}>{count}</div>
        <div className="message">
          {count >= 10 && "🎉목표달성"}
          {count <= -5 && "⚠️너무 많이 줄었어요"}
        </div>
      </div>
      <div className="buttonGroup">
        <button
          className="button"
          onClick={countUp}
          disabled={count >= 10 ? true : false}
        >
          ➕ 증가
        </button>
        <button
          className="button"
          onClick={countDown}
          disabled={count <= -5 ? true : false}
        >
          ➖ 감소
        </button>
        <button className="resetButton" onClick={countReset}>
          🔁 리셋
        </button>
      </div>
    </>
  );
}

export default Counter;
