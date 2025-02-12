import InterviewHeader from "../components/InterviewHeader";
import "../index.css";
import WebcamFeed from "../components/WebcamFeed";

const InterviewPage = () => {
  return (
    <div className="flex flex-col h-screen ">
      {/* 헤더 */}
      <InterviewHeader />
      {/* 메인 컨텐츠 */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        {/* 면접관 UI 등의 다른 컴포넌트 */}
        <WebcamFeed /> {/* 왼쪽 하단에 웹캠 표시 */}
      </div>{" "}
    </div>
  );
};

export default InterviewPage;
