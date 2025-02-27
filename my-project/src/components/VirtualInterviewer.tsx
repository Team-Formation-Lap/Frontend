import { useRef, forwardRef, useImperativeHandle } from "react";
import KoreanInterviewerVideo from "../assets/KoreanInterviewerVideo.mp4";

const VirtualInterviewer = forwardRef((_, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    playVideo: () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    },
    pauseVideo: () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    },
  }));

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        src={KoreanInterviewerVideo}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
});

export default VirtualInterviewer;
