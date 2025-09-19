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

// 컴포넌트 등록
Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
);
const ComprehensiveReport_design = () => {
  // 실제 점수 데이터(0~100)를 API 호출 등으로 받아오면 여기서 상태 관리
  const interviewScores = [15, 17, 18, 10, 15];
  return (
    <div className="py-2 mx-8 my-8 bg-white rounded-md shadow-md">
      <div className="p-4 mx-12 space-y-6">
        <div className="flex w-full h-full px-8 py-4">
          {/* 왼쪽: 텍스트 + 비디오 */}
          <div className="flex flex-col w-1/2 space-y-1">
            <div>
              <p className="text-xl font-semibold text-[#5865c5] ">
                새로운 도전을 하는
              </p>
              <h1 className="mt-1 text-4xl font-black ">
                신수진님의 첫 번째 면접
              </h1>
            </div>

            <div>
              <h2 className="text-lg font-black font-[monospace] mt-4">
                AI Summary
              </h2>
              <p className="mt-1 leading-relaxed text-gray-700">
                지원자의 답변은 전체적으로 논리적이며 주제에 집중되어 있어
                설득력이 높았습니다. 특히 사례를 들어 설명하는 방식이 인상
                깊었고, 질문의 의도를 잘 파악하여 핵심적인 내용을 전달하는
                능력이 돋보였습니다. 또한 눈맞춤, 자세, 손동작 등 비언어적
                표현도 자연스럽고 안정되어 있어 면접 전반에 긍정적인 인상을
                주었습니다.
              </p>
            </div>

            <div className="mt-4">
              {/* 비디오 자리 */}
              <video
                controls
                className="flex items-center justify-center w-full text-white bg-black rounded-md shadow h-80"
              >
                비디오 자리 src={interviewVideo_song}
              </video>
            </div>
          </div>

          {/* 오른쪽: 차트 자리 */}
          <div className="flex items-center justify-center w-1/2">
            <div className="w-5/6 h-[450px] mt-32 rounded-xl  border-2 border-gray-100 flex items-center justify-center p-2">
              <RadarChart interview={interviewScores} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveReport_design;
