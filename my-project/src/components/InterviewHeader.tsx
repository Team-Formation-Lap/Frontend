import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"; // 뒤로가기 아이콘
import Record from "../assets/Record.svg"; // 녹화 아이콘 경로
import { useNavigate } from "react-router-dom"; // 페이지 이동용import axios from "axios"; // axios 추가
import axios from "axios";

interface InterviewHeaderProps {
  socket: WebSocket | null; // 웹소켓을 부모(InterviewPage)에서 전달받음
  interviewId: number;
  stopVideoRecording: () => void;
  videoChunksRef: React.RefObject<Blob[]>; // ✅ videoChunksRef 추가
}

const InterviewHeader = ({
  socket,
  interviewId,
  stopVideoRecording,
  videoChunksRef,
}: InterviewHeaderProps) => {
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
  const handleEndInterview = async () => {
    console.log(
      "🛑 면접 종료: 영상 녹화 중지, 웹소켓 종료 및 영상 업로드 시작"
    );

    // 🎥 영상 녹화 중지
    stopVideoRecording();

    // 🔌 웹소켓 종료
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
      console.log("🔌 웹소켓 연결 종료됨.");
    }

    // 📤 녹화된 영상 가져오기
    // 📤 녹화된 영상 가져오기
    if (!videoChunksRef.current || videoChunksRef.current.length === 0) {
      console.error("❌ 녹화된 영상이 없습니다.");
      return;
    }
    const videoBlob = new Blob(videoChunksRef.current, { type: "video/webm" });

    // 📂 FormData 생성
    const formData = new FormData();
    formData.append("file", videoBlob, "interviewVideo.webm");

    try {
      const response = await axios.post(
        `http://localhost:8000/results/upload/${interviewId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        console.log("✅ 면접 영상 업로드 성공!");
        navigate("/report"); // 결과 페이지 이동
      } else {
        console.error("❌ 업로드 실패!", response);
      }
    } catch (error) {
      console.error("❌ 업로드 중 오류 발생:", error);
    }
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
