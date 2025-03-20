import { useRef, forwardRef, useImperativeHandle } from "react";
import KoreanInterviewerVideo from "../assets/KoreanInterviewerVideo.mp4";

const VirtualInterviewer = forwardRef((_, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useImperativeHandle(ref, () => ({
    playVideo: () => {
      if (videoRef.current) {
        if (videoRef.current.paused || videoRef.current.ended) {
          console.log("Playing video...");
          videoRef.current.play();
        } else {
          console.log("Video is already playing");
        }
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
        muted // 🔇 소리 제거 (음소거)
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
});

export default VirtualInterviewer;
