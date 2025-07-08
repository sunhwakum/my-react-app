import { useState } from "react";
import "./RockPaperScissors.css";

const choices = ["scissors", "rock", "paper"];
const ext = "webp"; // 확장자 고정

function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState("blank");
  const [computerChoice, setComputerChoice] = useState("blank");
  const [result, setResult] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (user, computer) => {
    if (user === computer) return "무승부!";
    if (
      (user === "scissors" && computer === "paper") ||
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock")
    ) {
      setUserScore((prev) => prev + 1);
      return "이겼어요!";
    } else {
      setComputerScore((prev) => prev + 1);
      return "졌어요!";
    }
  };

  const playRound = (user) => {
    const computer = getComputerChoice();
    setUserChoice(user);
    setComputerChoice(computer);
    const resultMessage = determineWinner(user, computer);
    setResult(resultMessage);
  };

  return (
    <div className="main-container">
      <div className="container">
        <div className="title">가위바위보 게임</div>

        <div className="choice">
          {choices.map((choice) => (
            <button
              key={choice}
              id={choice}
              onClick={() => playRound(choice)}
              style={{
                background: `url(/images/product/가위바위보/${choice}.${ext}) no-repeat center/cover`
              }}
              className="choice-btn"
              aria-label={choice}
            />
          ))}
        </div>

        <div className="result-container">
          <div className="result-img">
            <div className="you">
              <div>you</div>
              <div>
                <img
                  src={`/images/product/가위바위보/${userChoice}.${ext}`}
                  alt={userChoice}
                  id="user-choice-img"
                />
              </div>
            </div>

            <div className="score">
              <div>{userScore}</div>
              <div>:</div>
              <div>{computerScore}</div>
            </div>

            <div className="computer">
              <div>computer</div>
              <div>
                <img
                  src={`/images/product/가위바위보/${computerChoice}.${ext}`}
                  alt={computerChoice}
                  id="computer-choice-img"
                />
              </div>
            </div>
          </div>

          <div className="result-message">{result}</div>
        </div>
      </div>
    </div>
  );
}

export default RockPaperScissors;
