import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import useTimer from "../../hooks/useTimer";
import useUploadInterviewVideo from "../../hooks/useUploadInterviewVideo";
import { IMAGES } from "../../utils/constants";
import useWebSocket from "../../hooks/useWebSocket";
interface InterviewHeaderProps {
  socket: WebSocket | null;
  interviewId: number;
  stopVideoRecording: () => void;
  videoChunksRef: React.RefObject<Blob[]>;
}

const InterviewHeader = ({
  socket,
  interviewId,
  stopVideoRecording,
  videoChunksRef,
}: InterviewHeaderProps) => {
  const navigate = useNavigate();
  const { timer, formatTime } = useTimer();
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const virtualInterviewerRef = useRef<{
    playVideo: () => void;
    pauseVideo: () => void;
  }>(null);
  useWebSocket(virtualInterviewerRef, currentAudioRef);

  const { uploading, uploadVideo } = useUploadInterviewVideo(
    currentAudioRef,
    videoChunksRef,
    interviewId,
    stopVideoRecording,
    socket
  );

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-gray-400 bg-opacity-20 backdrop-blur-md shadow-sm fixed top-0 w-full z-10">
      <button
        className="flex items-center text-white text-m font-medium px-5 py-2 bg-gray-300 bg-opacity-60 rounded-md hover:bg-gray-200 transition ml-2"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-6 h-6 mr-1" />
        메인으로
      </button>

      <div className="flex-1 flex justify-center items-center">
        <img src={IMAGES.Record} alt="녹화 중" className="w-5 h-5 mr-2" />
        <span className="font-bold text-xl font-museo text-black">
          {formatTime(timer)}
        </span>
      </div>

      <button
        className={`flex items-center text-white text-m font-medium px-5 py-2 rounded-md transition ml-2 ${
          uploading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
        onClick={uploadVideo}
        disabled={uploading}
      >
        {uploading ? "면접영상 업로드 중..." : "면접 종료"}
      </button>
    </header>
  );
};

export default InterviewHeader;
