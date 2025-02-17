import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  AreaChart,
  Area,
} from "recharts";
import face1 from "../../assets/face1.png";
import face2 from "../../assets/face2.png";
import face3 from "../../assets/face3.png";
import face4 from "../../assets/face4.png";
import face5 from "../../assets/face5.png";

const emojiMap: { [key: number]: string } = {
  1: face1,
  2: face2,
  3: face3,
  4: face4,
  5: face5,
};

// 더미 데이터: 질문 9개로 가정, 점수는 1~5
const data = [
  { question: "Q1", score: 5 },
  { question: "Q2", score: 3 },
  { question: "Q3", score: 4 },
  { question: "Q4", score: 2 },
  { question: "Q5", score: 5 },
  { question: "Q6", score: 1 },
  { question: "Q7", score: 3 },
  { question: "Q8", score: 4 },
  { question: "Q9", score: 2 },
];
type CustomDotProps = {
  cx?: number;
  cy?: number;
  payload?: { score: number };
};

// 이모티콘을 점으로 표시하는 커스텀 렌더러
const CustomDot = ({ cx, cy, payload }: CustomDotProps) => {
  if (!cx || !cy || !payload) return null; // 좌표가 없거나 데이터가 없으면 렌더링하지 않음

  const emojiSrc = emojiMap[payload.score];

  return (
    <image x={cx - 12} y={cy - 12} width={24} height={24} href={emojiSrc} />
  );
};

const QuestionReport = () => {
  return (
    <div className="mx-10 mt-0 bg-gray-100 rounded-b-lg p-6 min-h-[400px]">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8884d8" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="question" />
          <YAxis domain={[1, 5]} tickCount={5} />
          <Tooltip />
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey="score"
              stroke="none"
              fill="url(#colorGradient)"
            />
          </AreaChart>
          <Line
            type="monotone"
            dataKey="score"
            stroke="#8884d8"
            strokeWidth={2}
            dot={<CustomDot />}
          />
          <Scatter data={data} fill="transparent" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuestionReport;
