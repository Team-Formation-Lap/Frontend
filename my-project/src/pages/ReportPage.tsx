import { useState } from "react";
import Header_login from "../components/Header_login";
import ComprehensiveReport from "../components/reports/ComprehensiveReport";
import QuestionReport from "../components/reports/QuestionReport";
import BehaviorReport from "../components/reports/BehaviorReport";
import "../index.css";
import { FaFilePdf } from "react-icons/fa";

const ReportPage = () => {
  const [activeTab, setActiveTab] = useState<
    "comprehensive" | "question" | "behavior"
  >("comprehensive");
  const dummyDate = "2025년 01월 26일 21시 30분";

  const renderContent = () => {
    switch (activeTab) {
      case "comprehensive":
        return <ComprehensiveReport />;
      case "question":
        return <QuestionReport />;
      case "behavior":
        return <BehaviorReport />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <Header_login />
      {/* 네비게이션 바 */}
      <div className="mx-10 mt-4 bg-[#5A55D9] text-white rounded-t-lg flex justify-between items-center">
        {/* 탭 메뉴 */}
        <div className="flex ">
          <button
            className={`px-7 py-2 rounded-t-lg font-museo font-semibold  tracking-widest ${
              activeTab === "comprehensive"
                ? "bg-[#2439B1]"
                : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("comprehensive")}
          >
            종합레포트
          </button>
          <button
            className={`px-5 py-4 rounded-t-lg font-museo font-semibold tracking-widest ${
              activeTab === "question" ? "bg-[#2439B1]" : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("question")}
          >
            질문별레포트
          </button>
          <button
            className={`px-7 py-2 rounded-t-lg font-museo font-semibold tracking-widest ${
              activeTab === "behavior" ? "bg-[#2439B1]" : "hover:bg-blue-600"
            }`}
            onClick={() => setActiveTab("behavior")}
          >
            행동레포트
          </button>
        </div>

        {/* 날짜 및 PDF 저장 버튼 */}
        <div className="flex items-center space-x-8">
          <span>{dummyDate}</span>
          <button className="flex items-center px-4 py-2 border border-dashed border-white rounded-lg hover:bg-white hover:text-[#4C40B5] relative left-[-10px]">
            <FaFilePdf className="mr-2" />
            PDF 문서 저장하기
          </button>
        </div>
      </div>
      {/* 렌더링 영역 */}
      <div className="p-5">{renderContent()}</div>
    </div>
  );
};

export default ReportPage;
