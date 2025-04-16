import Header from "../components/headers/Header";
import { useState, useEffect } from "react";
import { getInterviewResults, deleteInterviewResult } from "../api/resultAPI";
import useNavigation from "../hooks/useNavigation"; // 경로는 실제 위치에 따라 조정
// import ResumeManageModal from "../components/modals/ResumeManageModal";
interface MyPageProps {
  openLoginModal: () => void;
  openSignupModal: () => void;
  openManageModal: () => void;
}

interface AnalysisResult {
  result_id: number;
  create_at: string;
  resume: string;
}

const MyPage = ({
  openLoginModal,
  openSignupModal,
  openManageModal,
}: MyPageProps) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { goToArchivedReport } = useNavigation();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getInterviewResults();
        // 각 결과의 날짜 형식 확인
        data.results.forEach((result: AnalysisResult) => {
          console.log(
            "📅 result_id:",
            result.result_id,
            "create_at:",
            result.create_at
          );
        });
        setResults(data.results);
      } catch (err) {
        console.error("면접 결과 조회 실패", err);
      }
    };

    fetchResults();
  }, []);

  const currentItems = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 삭제 함수 추가
  const handleDelete = async (resultId: number) => {
    if (window.confirm("정말로 이 결과를 삭제하시겠습니까?")) {
      try {
        console.log("🗑️ 삭제 요청할 result_id:", resultId);
        await deleteInterviewResult(resultId);
        setResults(results.filter((result) => result.result_id !== resultId));
        alert("성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("결과 삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        handleLoginClick={openLoginModal}
        handleSignupClick={openSignupModal}
      />

      <div className="container mx-auto px-4 py-8">
        {/* 헤더 + 버튼 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">면접 기록</h1>
          <button
            onClick={openManageModal}
            className="text-sm px-4 py-2 rounded-md bg-[#504d63] text-white hover:bg-[#4b2fe6] transition"
          >
            이력서 관리
          </button>
        </div>

        <div className="bg-white rounded-lg flex flex-col">
          {/* 헤더 */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b bg-gray-50 text-gray-600 font-semibold">
            <div className="col-span-1 pl-8">NO</div>
            <div className="col-span-3 text-center">일자</div>
            <div className="col-span-6 text-center">이력서 제목</div>
            <div className="col-span-2 text-center">결과 보기</div>
          </div>

          {/* 리스트 */}
          <div className="min-h-[400px]">
            {currentItems.length === 0 ? (
              <div className="flex pt-10 items-center justify-center h-full text-gray-500">
                면접결과가 없습니다
              </div>
            ) : (
              currentItems.map((result, index) => (
                <div
                  key={result.result_id}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50"
                >
                  <div className="col-span-1 pl-8 text-gray-600">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </div>
                  <div className="col-span-3 text-center text-gray-600">
                    {result.create_at}
                  </div>
                  <div className="col-span-6 text-center text-gray-800">
                    {result.resume}
                  </div>
                  <div className="col-span-2 text-center flex justify-center gap-2">
                    <button
                      className="px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                      onClick={() => {
                        console.log(
                          "🔍 선택한 result_id:",
                          result.result_id,
                          result.create_at
                        );
                        goToArchivedReport(result.result_id, result.create_at);
                      }}
                    >
                      결과 보기
                    </button>
                    <button
                      className="px-4 py-1 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                      onClick={() => handleDelete(result.result_id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center p-4 mt-auto border-t">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              &lt;
            </button>

            <button className="mx-1 px-3 py-1 rounded-md bg-[#5C3BFF] text-white">
              {currentPage}
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
