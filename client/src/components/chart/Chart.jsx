import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

const data = [
  { name: "1-1", Total: 213 },
  { name: "2-1", Total: 147 },
  { name: "3-1", Total: 125 },
  { name: "1-2", Total: 47 },
  { name: "2-2", Total: 19 },
  { name: "3-2", Total: 154 },
  { name: "1-3", Total: 338 },
  { name: "2-3", Total: 287 },
  { name: "3-3", Total: 195 },
  { name: "1-4", Total: 318 },
  { name: "2-4", Total: 82 },
  { name: "3-4", Total: 365 },
  { name: "1-5", Total: 306 },
  { name: "2-5", Total: 253 },
  { name: "3-5", Total: 346 },
  { name: "1-6", Total: 451 },
  { name: "2-6", Total: 234 },
  { name: "3-6", Total: 203 },
  { name: "1-7", Total: 172 },
  { name: "2-7", Total: 202 },
  { name: "3-7", Total: 55 },
  { name: "1-8", Total: 115 },
  { name: "2-8", Total: 108 },
  { name: "3-8", Total: 162 },
  { name: "1-9", Total: 349 },
  { name: "2-9", Total: 106 },
  { name: "3-9", Total: 26 },
  { name: "1-10", Total: 15 },
  { name: "2-10", Total: 156 },
  { name: "3-10", Total: 179 },
  { name: "1-11", Total: 187 },
  { name: "2-11", Total: 481 },
  { name: "3-11", Total: 439 },
  { name: "1-12", Total: 483 },
  { name: "2-12", Total: 70 },
  { name: "3-12", Total: 411 },

];

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#b461e8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#b461e8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#b461e8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
