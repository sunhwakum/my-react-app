import {
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data from "./data/chartdata";

function MyComposeChart() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart width={600} height={300} data={data}>
          <Area type="monotone" dataKey="pv" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="uv" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="amt" stroke="#ff7300" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyComposeChart;
