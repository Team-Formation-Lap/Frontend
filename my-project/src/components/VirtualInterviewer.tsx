import InterviewerVideo from "../assets/InterviewerVideo.mp4";

const VirtualInterviewer = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <video
        src={InterviewerVideo}
        autoPlay
        loop
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default VirtualInterviewer;
