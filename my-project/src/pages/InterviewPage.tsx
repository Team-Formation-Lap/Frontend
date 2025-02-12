import InterviewHeader from "../components/InterviewHeader";
import "../index.css";
import WebcamFeed from "../components/WebcamFeed";
import VirtualInterviewer from "../components/VirtualInterviewer";

const InterviewPage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <VirtualInterviewer />
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 9999,
          }}
        >
          <WebcamFeed /> {/* 항상 화면 위에 표시 */}
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <InterviewHeader />
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
