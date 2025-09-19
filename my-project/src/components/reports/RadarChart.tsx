import { Radar } from "react-chartjs-2";

type Props = {
  interview: number[]; // ComprehensiveReport_design에서 부여
};

const labels = [
  "성장 가능성 및 태도",
  "정확성",
  "효율성",
  "협업 및 커뮤니케이션",
  "논리성",
];

export default function RadarChart({ interview }: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "점수",
        data: interview,
        backgroundColor: "rgba(30,136,229,0.45)",
        borderColor: "rgba(30,136,229,1)",
        borderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 부모 div 사이즈를 그대로 사용
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 20,
        ticks: {
          stepSize: 5, // 0·10·20 세 점만 계산
          callback: (value: number | string) => {
            // 10, 20일 때만 숫자를 표시하고 나머지는 빈 문자열
            return value === 10 || value === 20 ? value : "";
          },
        },
        grid: { color: "#d1d5db" },
        angleLines: { color: "#d1d5db" },
        pointLabels: { font: { size: 14, weight: 500 } },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "start" as const,

        labels: { usePointStyle: true, boxWidth: 10 },
      },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="w-full h-full">
      <Radar data={data} options={options} />
    </div>
  );
}
