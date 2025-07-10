import axios from "axios";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SeoulMeanTemp() {
  const [temps, setTemps] = useState([]);
  const [month, setMonth] = useState(1);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/seoultemp/mean?month=" + month
      );
      setTemps(response.data);
    } catch (error) {
      console.error("데이터 가져오는 중 에러 발생", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]);

  return (
    <>
      <select
        name="month"
        onChange={(e) => {
          setMonth(e.target.value);
        }}
      >
        <option value="1">1월</option>
        <option value="2">2월</option>
        <option value="3">3월</option>
        <option value="4">4월</option>
        <option value="5">5월</option>
        <option value="6">6월</option>
        <option value="7">7월</option>
        <option value="8">8월</option>
        <option value="9">9월</option>
        <option value="10">10월</option>
        <option value="11">11월</option>
        <option value="12">12월</option>
      </select>
      <h2 className="seoul-temp-title">
        서울시 {month}월 평균기온 연도별 변화
      </h2>
      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={temps}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <Line
              dataKey="min"
              type="monotone"
              stroke="blue"
              strokeWidth={2}
              name="평균 최저기온"
            />
            <Line
              dataKey="mean"
              type="monotone"
              stroke="green"
              strokeWidth={2}
              name="평균 평균기온"
            />
            <Line
              dataKey="max"
              type="monotone"
              stroke="red"
              strokeWidth={2}
              name="평균 최고기온"
            />
            <XAxis dataKey="year" />
            <YAxis domain={[-20, 40]} />
            <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
            <Legend align="right" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
export default SeoulMeanTemp;
