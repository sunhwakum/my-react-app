import data from "./data/chartdata.js";
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

function MyLineChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Line
            dataKey="uv"
            type="monotone"
            stroke="purple"
            strokeWidth={2}
            name="uv변화"
          />
          <Line
            dataKey="pv"
            type="monotone"
            stroke="green"
            strokeWidth={2}
            name="pv변화"
          />
          <Line
            dataKey="amt"
            type="monotone"
            stroke="blue"
            strokeWidth={2}
            name="amt변화"
          />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "UV", position: "insideLeft", angle: -90 }} />
          <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
          <Legend align="right" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyLineChart;
