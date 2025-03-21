import { useEffect, useRef } from "react";

const WebcamFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("웹캠 접근 오류:", err);
      }
    };

    startWebcam();

    // 컴포넌트 언마운트 시 스트림 정지
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <video ref={videoRef} autoPlay muted style={styles.video} />
    </div>
  );
};

const styles = {
  container: {
    position: "fixed" as const, // 화면 고정
    bottom: "10px", // 아래쪽 여백
    left: "10px", // 왼쪽 여백
    width: "350px", // 가로 크기
    height: "220px", // 세로 크기
    border: "2px solid #ccc", // 테두리
    borderRadius: "10px", // 둥근 모서리
    overflow: "hidden", // 넘치는 부분 숨김
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // 그림자 효과
    backgroundColor: "#000", // 배경색
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const, // 화면 비율 유지
  },
};

export default WebcamFeed;
