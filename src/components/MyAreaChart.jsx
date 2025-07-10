import {
  AreaChart,
  Area,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data from "../data/chartdata.js";
function MyAreaChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#89043D"
            fill="#89043D"
          ></Area>
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#2FE6DE"
            fill="#2FE6DE"
          ></Area>
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#B2ABF2"
            fill="#B2ABF2"
          ></Area>

          <YAxis />
          <XAxis dataKey="name" />
          <Legend />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyAreaChart;
