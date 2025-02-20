import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"; // 뒤로가기 아이콘
import Record from "../assets/Record.svg"; // 녹화 아이콘 경로
import { useNavigate } from "react-router-dom"; // 페이지 이동용
interface InterviewHeaderProps {
  socket: WebSocket | null; // 웹소켓을 부모(InterviewPage)에서 전달받음
}
const InterviewHeader = ({ socket }: InterviewHeaderProps) => {
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
  const navigate = useNavigate(); // navigate 훅 사용
  const handleMainPageClick = () => {
    console.log("메인페이지로 이동");

    navigate("/"); // state에 memberId 전달
  };
  // ✅ 면접 종료 (웹소켓 종료 & 결과 페이지 이동)
  const handleEndInterview = () => {
    console.log("면접 종료, 웹소켓 연결 닫기");

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close(); // 웹소켓 종료
      console.log("웹소켓 연결 종료됨.");
    }

    navigate("/report"); // 결과 페이지로 이동
  };
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-gray-400 bg-opacity-20 backdrop-blur-md shadow-sm fixed top-0 w-full z-10">
      {/* 돌아가기 버튼 */}
      <button
        className="flex items-center text-white text-m font-medium px-5 py-2  bg-gray-300 bg-opacity-60 rounded-md hover:bg-gray-200 transition ml-2"
        onClick={() => handleMainPageClick()} // 클릭 이벤트 핸들러
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
      {/* ✅ 면접 종료 버튼 (오른쪽에 추가) */}
      <button
        className="flex items-center text-white text-m font-medium px-5 py-2 bg-red-500 bg-opacity-80 rounded-md hover:bg-red-600 transition ml-2"
        onClick={handleEndInterview}
      >
        면접 종료
      </button>
    </header>
  );
};

export default InterviewHeader;
