import { useState, useEffect } from "react";

import Header from "../components/headers/Header";
import ComprehensiveReport from "../components/reports/ComprehensiveReport";
import QuestionReport from "../components/reports/QuestionReport";
import BehaviorReport from "../components/reports/BehaviorReport";
import "../index.css";
import { FaFilePdf } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toQAItems } from "../hooks/useToQAItems";

export interface QAItem {
  id: number;
  question: string;
  answer: string;
  feedback: string[];
}

// 2) reportData 전체 구조 정의
interface ReportData {
  overallFeedback: string;
  answerFeedback: QAItem[];
  behaviorFeedback: string;
  videoUrl: string;
}

const ArchivedReportPage = () => {
  const location = useLocation();
  const resultId = location.state?.resultId;
  console.log("resultId", { resultId });

  const create_at = location.state?.create_at;
  console.log("create_at", { create_at });

  const [reportData, setReportData] = useState<ReportData>({
    overallFeedback: "",
    behaviorFeedback: "",
    answerFeedback: [],
    videoUrl: "",
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
        // const data = response.data;
        // const rawQA = data.answer_feedback;
        // ① 전체 HTTP 응답 객체
        console.log("[DEBUG] axios response ➜", response);

        // ② 서버가 보낸 실제 데이터(payload)
        const data = response.data;
        console.log(
          "[DEBUG] parsed data ➜",
          JSON.stringify(data, null, 2) // 들여쓰기 2칸
        );
        let rawQA: unknown = data.answer_feedback;

        // ③ answer-feedback 배열만 별도로 보고 싶다면
        console.log(typeof data.answer_feedback);
        console.table(rawQA); // 이제 정상 표 출력

        // 문자열이면 파싱 시도
        if (typeof rawQA === "string") {
          try {
            // 홑따옴표 → 쌍따옴표 교체 (완전한 JSON 규격은 아님에 주의)
            const fixed = rawQA.replace(/'/g, '"');
            rawQA = JSON.parse(fixed);
          } catch (e) {
            console.error("⚠️ answer_feedback 파싱 실패", e);
            rawQA = []; // 실패했으면 빈 배열로라도 세팅
          }
        }

        setReportData({
          overallFeedback: data.overall_feedback,
          behaviorFeedback: data.behavior_feedback,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          answerFeedback: toQAItems(rawQA as any),
          videoUrl: data.video_url ?? "",
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
        return (
          <ComprehensiveReport
            feedback={reportData.overallFeedback}
            videoUrl={reportData.videoUrl}
          />
        );
      case "question":
        return <QuestionReport items={reportData.answerFeedback} />;
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
