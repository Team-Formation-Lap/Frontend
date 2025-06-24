import React from "react";

interface BehaviorItem {
  start: string;
  actions: string[];
}

interface BehaviorReportProps {
  behaviorData: BehaviorItem[];
  feedback: string;
  videoUrl: string;
}

const BehaviorReport = ({
  behaviorData,
  feedback,
  videoUrl,
}: BehaviorReportProps) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-4 space-y-6">
      <div className="mt-2">
        {/* 비디오 자리 */}

        {videoUrl ? (
          <video
            controls
            src={videoUrl}
            className="w-full h-96  rounded-md shadow flex "
          />
        ) : (
          <div className="text-gray-500">비디오가 없습니다.</div>
        )}
      </div>
      <h2 className="text-lg font-semibold mb-2">행동 분석</h2>

      {behaviorData.length === 0 ? (
        <p className="text-gray-500">행동 데이터를 불러오는 중입니다...</p>
      ) : (
        <ul className="space-y-2">
          {behaviorData.map((item, index) => (
            <li key={index} className="text-gray-800">
              <span className="font-medium">⏱ {item.start}</span>
              <span className="ml-2">{item.actions.join(", ")}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 border-t pt-4">
        <h3 className="text-md font-semibold mb-2">📋 종합 피드백</h3>
        <p className="text-gray-800 whitespace-pre-line">
          {feedback || "피드백을 생성중입니다..."}
        </p>
      </div>
    </div>
  );
};

export default BehaviorReport;
