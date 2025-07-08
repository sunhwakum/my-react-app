import React, { useState, useEffect, useRef } from "react";

const ROWS = 10;
const COLS = 15;

// 맵 요소
// 0: 빈칸, 1: 벽, 2: 먹이, 3: 파워업 알약
const INITIAL_MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
  [1,2,1,1,2,1,1,1,1,1,2,1,1,2,1],
  [1,2,1,0,0,0,0,0,0,1,0,0,1,2,1],
  [1,2,1,0,1,1,1,0,1,1,1,0,1,2,1],
  [1,2,0,0,0,0,1,0,0,0,0,0,1,2,1],
  [1,1,1,1,1,0,1,1,1,1,1,0,1,2,1],
  [1,2,2,2,1,0,0,0,0,0,1,0,2,2,1],
  [1,2,1,2,2,2,1,1,1,2,2,2,1,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// 유령 초기 위치 및 방향
const GHOSTS_INIT = [
  { row: 8, col: 7, dir: "left", color: "#f00" },
  { row: 1, col: 13, dir: "up", color: "#00f0ff" },
];

// 방향 벡터
const DIRS = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

function Pacman() {
  const [map, setMap] = useState(INITIAL_MAP);
  const [pacmanPos, setPacmanPos] = useState({ row: 1, col: 1, dir: "right" });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [ghosts, setGhosts] = useState(GHOSTS_INIT);
  const [poweredUp, setPoweredUp] = useState(false);
  const powerTimeoutRef = useRef(null);
  const gameOverRef = useRef(false);

  // 팩맨 움직임 처리
  useEffect(() => {
    function handleKey(e) {
      if (gameOverRef.current) return;
      let dir = null;
      if (e.key === "ArrowUp") dir = "up";
      else if (e.key === "ArrowDown") dir = "down";
      else if (e.key === "ArrowLeft") dir = "left";
      else if (e.key === "ArrowRight") dir = "right";
      if (!dir) return;

      setPacmanPos((prev) => {
        const { row, col } = prev;
        const [dr, dc] = DIRS[dir];
        const newRow = row + dr;
        const newCol = col + dc;

        if (map[newRow][newCol] === 1) return { ...prev, dir }; // 벽이면 방향만 바꿈

        // 먹이 처리
        if (map[newRow][newCol] === 2) {
          const newMap = map.map((r) => r.slice());
          newMap[newRow][newCol] = 0;
          setMap(newMap);
          setScore((s) => s + 10);
        }

        // 파워업 처리
        if (map[newRow][newCol] === 3) {
          const newMap = map.map((r) => r.slice());
          newMap[newRow][newCol] = 0;
          setMap(newMap);
          setPoweredUp(true);
          setScore((s) => s + 50);
          clearTimeout(powerTimeoutRef.current);
          powerTimeoutRef.current = setTimeout(() => {
            setPoweredUp(false);
          }, 10000);
        }

        return { row: newRow, col: newCol, dir };
      });
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [map]);

  // 유령 움직임 (간단 랜덤)
  useEffect(() => {
    if (gameOverRef.current) return;
    const interval = setInterval(() => {
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost, idx) => {
          const { row, col } = ghost;
          const possibleDirs = Object.entries(DIRS).filter(([_, [dr, dc]]) => {
            const nr = row + dr;
            const nc = col + dc;
            return map[nr][nc] !== 1;
          });
          if (possibleDirs.length === 0) return ghost;
          const [dir, [dr, dc]] =
            possibleDirs[Math.floor(Math.random() * possibleDirs.length)];
          return { ...ghost, row: row + dr, col: col + dc, dir };
        })
      );
    }, 700);
    return () => clearInterval(interval);
  }, [map]);

  // 충돌 검사 (팩맨 - 유령)
  useEffect(() => {
    if (gameOverRef.current) return;
    ghosts.forEach((ghost, idx) => {
      if (ghost.row === pacmanPos.row && ghost.col === pacmanPos.col) {
        if (poweredUp) {
          // 유령 잡으면 점수 +100, 유령 리셋 위치로 이동
          setScore((s) => s + 100);
          setGhosts((gs) =>
            gs.map((g, i) =>
              i === idx ? { ...GHOSTS_INIT[idx] } : g
            )
          );
        } else {
          // 팩맨 목숨 하나 잃음
          setLives((l) => l - 1);
          setPacmanPos({ row: 1, col: 1, dir: "right" }); // 시작 위치로 리셋
          if (lives <= 1) {
            gameOverRef.current = true;
            setTimeout(() => alert("게임 오버!"), 100);
          }
        }
      }
    });
  }, [ghosts, pacmanPos, poweredUp, lives]);

  // 먹이 다 먹었는지 체크
  useEffect(() => {
    if (gameOverRef.current) return;
    const leftPellets = map.flat().filter((v) => v === 2 || v === 3).length;
    if (leftPellets === 0) {
      gameOverRef.current = true;
      setTimeout(() => alert("클리어! 축하합니다!"), 100);
    }
  }, [map]);

  // 스타일 정의
  const cellBase = {
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#22284e",
    boxSizing: "border-box",
  };
  const wallStyle = {
    background: "linear-gradient(135deg,#00f0ff 60%,#001144 100%)",
    boxShadow: "0 0 8px 2px #00f0ff",
    borderRadius: 8,
    border: "2px solid #00f0ff",
  };
  const pelletStyle = {
    width: 10,
    height: 10,
    backgroundColor: "#fff",
    borderRadius: "50%",
    boxShadow: "0 0 8px 2px #fff",
    margin: "auto",
    animation: "pellet-blink 1s infinite alternate",
  };
  const powerPelletStyle = {
    width: 18,
    height: 18,
    background: "radial-gradient(circle, #fff 60%, #ffd700 100%)",
    borderRadius: "50%",
    animation: "pulse 1s infinite alternate",
    margin: "auto",
  };

  // 팩맨 입 애니메이션 방향별
  const pacmanMouth = {
    up: "rotate(-90deg)",
    down: "rotate(90deg)",
    left: "scaleX(-1)",
    right: "",
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "'Press Start 2P', 'Pretendard', monospace", background: "#111", minHeight: "100vh", paddingTop: 30 }}>
      {/* 네온 효과 헤더 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes pacman-mouth {
          0%, 100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
          50% { clip-path: polygon(0% 0%, 100% 25%, 100% 75%, 0% 100%); }
        }
        @keyframes ghost-blink {
          0%,100% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
        }
        @keyframes pellet-blink {
          0% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 8px 2px #ffd700; }
          100% { box-shadow: 0 0 24px 8px #ffd700; }
        }
        .neon {
          color: #00f0ff;
          text-shadow: 0 0 8px #00f0ff, 0 0 16px #00f0ff, 0 0 24px #00f0ff;
          font-size: 2.2rem;
          margin-bottom: 10px;
        }
        .scoreboard {
          color: #ffd700;
          text-shadow: 0 0 5px #fff, 0 0 12px #ffd700;
          font-size: 1.1rem;
          margin-bottom: 18px;
        }
        .gameover {
          color: #ff3366;
          text-shadow: 0 0 8px #ff3366, 0 0 16px #fff;
          font-size: 2rem;
          animation: pulse 1s infinite alternate;
        }
      `}</style>
      <div className="neon">PAC-MAN</div>
      <div className="scoreboard">
        점수: {score} &nbsp; | &nbsp; 목숨: {lives} &nbsp; | &nbsp;
        남은 먹이: {map.flat().filter((v) => v === 2 || v === 3).length}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${ROWS}, 40px)`,
          gridTemplateColumns: `repeat(${COLS}, 40px)`,
          gap: 2,
          backgroundColor: "#0a0a1a",
          width: COLS * 40 + 8,
          margin: "auto",
          position: "relative",
          userSelect: "none",
          borderRadius: 16,
          boxShadow: "0 0 32px 8px #00f0ff77",
        }}
      >
        {map.map((rowArr, r) =>
          rowArr.map((cell, c) => {
            const isPacman = r === pacmanPos.row && c === pacmanPos.col;
            const ghostHere = ghosts.find((g) => g.row === r && g.col === c);

            let style = { ...cellBase };
            if (cell === 1) style = { ...style, ...wallStyle };

            return (
              <div
                key={`${r}-${c}`}
                style={style}
              >
                {cell === 2 && <div style={pelletStyle} />}
                {cell === 3 && <div style={powerPelletStyle} />}
                {isPacman && (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      background: poweredUp
                        ? "radial-gradient(circle, #fff700 60%, #ffb300 100%)"
                        : "radial-gradient(circle, #ffb300 60%, #ff9800 100%)",
                      borderRadius: "50%",
                      position: "absolute",
                      top: 5,
                      left: 5,
                      boxShadow: "0 0 12px 4px #ffb300",
                      animation: "pacman-mouth 0.35s infinite",
                      transition: "background 0.3s",
                      transform: pacmanMouth[pacmanPos.dir],
                    }}
                  />
                )}
                {ghostHere && (
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: poweredUp ? "#2e90ff" : ghostHere.color,
                      borderRadius: "50% 50% 40% 40% / 60% 60% 100% 100%",
                      position: "absolute",
                      top: 5,
                      left: 5,
                      boxShadow: "0 0 8px 3px #fff",
                      border: "2px solid #fff",
                      transition: "background-color 0.3s",
                      animation: poweredUp ? "ghost-blink 0.5s infinite" : undefined,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}
                  >
                    {/* 유령 눈동자 */}
                    <div style={{
                      display: "flex",
                      flexDirection: "row",
                      position: "absolute",
                      top: 10,
                      left: 7,
                    }}>
                      <div style={{
                        width: 7,
                        height: 7,
                        background: "#fff",
                        borderRadius: "50%",
                        marginRight: 3,
                        border: "1px solid #ccc",
                        position: "relative",
                        overflow: "hidden",
                      }}>
                        <div style={{
                          width: 3,
                          height: 3,
                          background: "#111",
                          borderRadius: "50%",
                          position: "absolute",
                          top: 2,
                          left: pacmanPos.col < ghostHere.col ? 1 : 3,
                        }} />
                      </div>
                      <div style={{
                        width: 7,
                        height: 7,
                        background: "#fff",
                        borderRadius: "50%",
                        border: "1px solid #ccc",
                        position: "relative",
                        overflow: "hidden",
                      }}>
                        <div style={{
                          width: 3,
                          height: 3,
                          background: "#111",
                          borderRadius: "50%",
                          position: "absolute",
                          top: 2,
                          left: pacmanPos.col < ghostHere.col ? 1 : 3,
                        }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
      <p style={{ marginTop: 18, fontSize: "1.1rem", color: "#fff", textShadow: "0 0 6px #00f0ff" }}>
        <span style={{ color: "#ffd700" }}>방향키</span>로 팩맨을 움직이세요.<br />
        <span style={{ color: "#fff" }}>먹이와 파워업 알약을 먹고, 유령을 피하거나 파워업 상태에서 잡으세요!</span>
      </p>
      {gameOverRef.current && (
        <div className="gameover">
          게임 오버! <br /> 새로고침해서 다시 시작하세요.
        </div>
      )}
    </div>
  );
}

export default Pacman;
