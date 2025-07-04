import { useState, useEffect } from "react";

import Header from "../components/headers/Header";
import ComprehensiveReport from "../components/reports/ComprehensiveReport";
// import ComprehensiveReport_design from "../components/reports/ComprehensiveReport_design";
// import QuestionReport_design from "../components/reports/QuestionReport_design";
import QuestionReport from "../components/reports/QuestionReport";
// import BehaviorReport_design from "../components/reports/BehaviorReport_design";
import BehaviorReport from "../components/reports/BehaviorReport";
import "../index.css";
import { FaFilePdf } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toQAItems } from "../hooks/useToQAItems";
// 1) 먼저 QAItem 타입이 이미 선언돼 있다고 가정
export interface QAItem {
  id: number;
  question: string;
  answer: string;
  feedback: string[];
}

// 2) reportData 전체 구조 정의
interface ReportData {
  comprehensiveFeedback: {
    content: string;
    scores: number[];
  };
  questionFeedback: QAItem[];
  behaviorFeedback: string;
  videoUrl: string;
}
const ReportPage = () => {
  const location = useLocation();
  const interviewId = location.state?.interviewId;
  const [reportData, setReportData] = useState<ReportData>({
    comprehensiveFeedback: {
      content: "",
      scores: [],
    },
    questionFeedback: [],
    behaviorFeedback: "",
    videoUrl: "",
  });
  const [activeTab, setActiveTab] = useState<
    "comprehensive" | "question" | "behavior"
  >("comprehensive");
  const dummyDate = "2025년 01월 26일 21시 30분";

  // 면접 결과 생성 API 호출
  useEffect(() => {
    const fetchReports = async () => {
      if (!interviewId) return;

      try {
        // 첫 번째 API 실행 (행동 데이터 분석)
        console.log("Executing first API: Behavior analysis");
        await axiosInstance.post(`/api/apps/behavior/${interviewId}`, {});

        // 첫 번째 API가 성공하면 두 번째 API 실행 (결과 데이터 가져오기)
        console.log(
          "First API succeeded, executing second API: Fetching results"
        );
        const response = await axiosInstance.post(
          `/api/apps/result/${interviewId}`,
          {
            user_id: 1,
            question_count: 3,
          }
        );

        console.log("API response:", response.data);
        const rawQA = response.data.feedback["답변피드백"] ?? [];
        setReportData({
          comprehensiveFeedback: {
            content: response.data.feedback["종합피드백"].content || "",
            scores: response.data.feedback["종합피드백"].scores || [],
          },
          questionFeedback: toQAItems(rawQA),
          behaviorFeedback: response.data.feedback["행동피드백"] || "",
          videoUrl: response.data.video_url || "",
        });
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReports();
  }, [interviewId]);

  const renderContent = () => {
    switch (activeTab) {
      case "comprehensive":
        return (
          <ComprehensiveReport
            feedback={reportData.comprehensiveFeedback.content}
            interviewScores={reportData.comprehensiveFeedback.scores}
            videoUrl={reportData.videoUrl}
          />
        );
      // return <ComprehensiveReport_design />;
      case "question":
        return <QuestionReport items={reportData.questionFeedback} />;
      // return <QuestionReport_design />;
      case "behavior":
        return (
          <BehaviorReport
            feedback={reportData.behaviorFeedback}
            videoUrl={reportData.videoUrl}
          />
        );
      // return <BehaviorReport_design />;
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
          <span>{dummyDate}</span>
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

export default ReportPage;
