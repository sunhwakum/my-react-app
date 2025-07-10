import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import data from "./data/chartdata";

function MyBarChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Tooltip />
          <Bar dataKey="uv" stackId="a" fill="#89043D" />
          <Bar dataKey="pv" stackId="a" fill="#2FE6DE" />
          <Bar dataKey="amt" stackId="a" fill="#B2ABF2" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyBarChart;
