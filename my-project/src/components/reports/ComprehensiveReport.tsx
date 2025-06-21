import interviewVideo_song from "../../assets/interviewVideo_song.webm";
import RadarChart from "./RadarChart.tsx";
// import React, { useEffect } from "react";
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip,
} from "chart.js";

// 래이더 차트 컴포넌트 등록
Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
);

const ComprehensiveReport = ({ feedback }: { feedback: string }) => {
  // 실제 점수 데이터(0~100)를 API 호출 등으로 받아오면 여기서 상태 관리할것
  const interviewScores = [15, 17, 18, 10, 15];
  return (
    <div className="bg-white mx-8 my-8 py-4 shadow-md rounded-md">
      <div className="p-4 space-y-6 mx-12">
        <div className="flex w-full h-full px-8 py-12">
          {/* 왼쪽: 텍스트 + 비디오 */}
          <div className="w-1/2 flex flex-col space-y-3">
            <div>
              <p className="text-xl font-semibold text-[#5865c5] ">
                새로운 도전을 하는
              </p>
              <h1 className="text-4xl font-black mt-1 ">
                신수진님의 첫 번째 면접
              </h1>
            </div>

            <div>
              <h2 className="text-lg font-black font-[monospace] mt-4">
                AI Summary
              </h2>
              <p className="text-gray-700 mt-1 leading-relaxed">{feedback}</p>
            </div>

            <div className="mt-4">
              {/* 비디오 자리 */}
              <video
                controls
                className="w-full h-80 bg-black rounded-md shadow flex items-center justify-center text-white"
              >
                비디오 자리 src={interviewVideo_song}
              </video>
            </div>
          </div>

          {/* 오른쪽: 차트 자리 */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-5/6 h-[450px] mt-32 rounded-xl  border-2 border-gray-100 flex items-center justify-center p-2">
              <RadarChart interview={interviewScores} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveReport;
