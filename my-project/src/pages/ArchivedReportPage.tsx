import { useState, useEffect } from "react";

import Header from "../components/headers/Header";
import ComprehensiveReport from "../components/reports/ComprehensiveReport";
import QuestionReport from "../components/reports/QuestionReport";
import BehaviorReport from "../components/reports/BehaviorReport";
import "../index.css";
import { FaFilePdf } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ArchivedReportPage = () => {
  const location = useLocation();
  const resultId = location.state?.resultId;
  console.log("resultId", { resultId });

  const create_at = location.state?.create_at;
  console.log("create_at", { create_at });
  const [reportData, setReportData] = useState({
    overallFeedback: "",
    behaviorFeedback: "",
    answerFeedback: "",
    questionPairs: [],
  });
  const [activeTab, setActiveTab] = useState<
    "comprehensive" | "question" | "behavior"
  >("comprehensive");

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const hours = `${date.getHours()}`.padStart(2, "0");
    const minutes = `${date.getMinutes()}`.padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
  };
  const formattedDate = create_at ? formatDateTime(create_at) : "";
  console.log("날짜", { formattedDate });
  useEffect(() => {
    const fetchReport = async () => {
      if (!resultId) return;

      try {
        const response = await axiosInstance.get(`/results/${resultId}`);
        const data = response.data;

        setReportData({
          //   resume: data.resume,
          overallFeedback: data.overall_feedback,
          behaviorFeedback: data.behavior_feedback,
          answerFeedback: data.answer_feedback,
          questionPairs: data.qna_pair || [],
        });
      } catch (error) {
        console.error("📛 결과 조회 실패:", error);
      }
    };

    fetchReport();
  }, [resultId]);

  const renderContent = () => {
    switch (activeTab) {
      case "comprehensive":
        return <ComprehensiveReport feedback={reportData.overallFeedback} />;
      case "question":
        return <QuestionReport feedback={reportData.answerFeedback} />;
      case "behavior":
        return <BehaviorReport feedback={reportData.behaviorFeedback} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <Header handleLoginClick={() => {}} handleSignupClick={() => {}} />
      {/* 네비게이션 바 */}
      <div className="mx-14 mt-4 bg-[#5A55D9] text-white rounded-t-lg flex justify-between items-center">
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
          <span>{formattedDate}</span>
          <button className="flex items-center px-4 py-1 border border-dashed border-white hover:bg-white hover:text-[#4C40B5] relative left-[-10px]">
            <FaFilePdf className="mr-2" />
            PDF 문서 저장하기
          </button>
        </div>
      </div>
      {/* 렌더링 영역 */}
      <div className="mx-14 mt-0 bg-gray-100 rounded-b-lg p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ArchivedReportPage;
