import { QAItem } from "../../hooks/useToQAItems";

interface QuestionReportProps {
  items: QAItem[]; // ← 배열로 명확히
}

const QuestionReport = ({ items }: QuestionReportProps) => {
  if (!items.length) {
    return (
      <div className="p-4 bg-white shadow-md rounded-md mt-4">
        <p className="text-gray-500 animate-pulse">
          AI 피드백을 생성하는 중입니다...
        </p>
      </div>
    );
  }
  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-4 space-y-10">
      {items.map((q) => (
        <div key={q.id} className="p-4 space-y-6 mx-12">
          {/* 질문 */}
          <div className="bg-[rgb(112,103,193)] px-4 py-3 mx-16 rounded-2xl text-white font-semibold tracking-wider">
            Q{q.id}. {q.question}
          </div>

          {/* 답변 + 피드백 */}
          <div className="bg-gray-50 p-6 mx-20 rounded-md border border-gray-200 space-y-4">
            {/* 답변 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">답변</h3>
              <p className="text-gray-700 leading-relaxed">{q.answer}</p>
            </div>

            <hr className="border-gray-300" />

            {/* 피드백 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">AI 피드백</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {q.feedback}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionReport;
