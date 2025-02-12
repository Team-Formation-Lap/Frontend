import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"; // 뒤로가기 아이콘
import Record from "../assets/Record.svg"; // 녹화 아이콘 경로

const InterviewHeader = () => {
  const [timer, setTimer] = useState(0); // 타이머 상태

  // 타이머 증가 로직
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정지
  }, []);

  // 초를 분:초 형식으로 변환
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-gray-400 bg-opacity-100 backdrop-blur-md shadow-sm fixed top-0 w-full z-10">
      {/* 돌아가기 버튼 */}
      <button
        className="flex items-center text-white text-m font-medium px-5 py-2  bg-gray-300 bg-opacity-100 rounded-md hover:bg-gray-200 transition ml-2"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="w-6 h-6 mr-1" />
        메인으로
      </button>

      {/* 녹화 타이머 */}
      <div className="flex-1 flex justify-center items-center">
        <img src={Record} alt="녹화 중" className="w-5 h-5 mr-2" />
        <span className="font-bold text-xl font-museo text-black">
          {formatTime(timer)}
        </span>
      </div>
    </header>
  );
};

export default InterviewHeader;
