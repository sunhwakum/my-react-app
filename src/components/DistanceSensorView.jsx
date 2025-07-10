import React, { useEffect, useState } from "react";

export default function DistanceSensorView() {
  const [distance, setDistance] = useState(null);

  // 서버에서 최신 거리값 받아오기
  const fetchDistance = async () => {
    try {
      const res = await fetch("http://localhost:8000/sensor/distance/recent");
      const data = await res.json();

      console.log("받은 데이터:", data);
      if (typeof data.distance === "number") {
        setDistance(data.distance);
      } else {
        setDistance(null);
      }
    } catch (err) {
      console.error("거리값 불러오기 실패:", err);
      setDistance(null);
    }
  };

  useEffect(() => {
    fetchDistance();
    const interval = setInterval(fetchDistance, 2000);
    return () => clearInterval(interval);
  }, []);

  const message =
    distance === null
      ? "로딩 중..."
      : distance > 80
      ? "장애물이 너무 멀어요."
      : distance < 10
      ? "장애물이 너무 가까워요!"
      : `현재 거리: ${distance.toFixed(2)} cm`;

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>초음파 센서 장애물 감지</h2>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}
