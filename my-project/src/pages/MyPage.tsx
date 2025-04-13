import Header from "../components/headers/Header";
import { useState, useEffect } from "react";
import { getInterviewResults } from "../api/resultAPI";
import useNavigation from "../hooks/useNavigation"; // 경로는 실제 위치에 따라 조정

interface MyPageProps {
  openLoginModal: () => void;
  openSignupModal: () => void;
  openUploadingModal: () => void;
}

interface AnalysisResult {
  result_id: number;
  create_at: string;
  resume: string;
}

const MyPage = ({ openLoginModal, openSignupModal }: MyPageProps) => {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [currentPage] = useState(1);
  const itemsPerPage = 7;
  const { goToArchivedReport } = useNavigation();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await getInterviewResults();
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        handleLoginClick={openLoginModal}
        handleSignupClick={openSignupModal}
      />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">면접 기록</h1>

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
            {currentItems.map((result, index) => (
              <div
                key={result.result_id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50"
              >
                <div className="col-span-1 pl-8 text-gray-600">{index + 1}</div>
                <div className="col-span-3 text-center text-gray-600">
                  {result.create_at}
                </div>
                <div className="col-span-6 text-center text-gray-800">
                  {result.resume}
                </div>
                <div className="col-span-2 text-center">
                  <button
                    className="px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() => {
                      console.log("🔍 선택한 result_id:", result.result_id);
                      goToArchivedReport(result.result_id, result.create_at);
                    }}
                  >
                    결과 보기
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center p-4 mt-auto border-t">
            <button
              disabled={true}
              className="mx-1 px-3 py-1 rounded-md text-gray-400 cursor-not-allowed"
            >
              &lt;
            </button>

            <button className="mx-1 px-3 py-1 rounded-md bg-[#5C3BFF] text-white">
              1
            </button>

            <button
              disabled={true}
              className="mx-1 px-3 py-1 rounded-md text-gray-400 cursor-not-allowed"
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
