import Header from "../components/headers/Header";
import { useState } from "react";

interface MyPageProps {
  openLoginModal: () => void;
  openSignupModal: () => void;
  openUploadingModal: () => void;
}

// 분석 결과 타입 정의
interface AnalysisResult {
  id: number;
  date: string;
  fileName: string;
}

const MyPage = ({ openLoginModal, openSignupModal }: MyPageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // 더미 데이터
  const dummyResults: AnalysisResult[] = [
    {
      id: 1,
      date: "2025-01-06 17:04",
      fileName: "신수진이력서_2025버전.pdf",
    },
    {
      id: 2,
      date: "2025-01-05 15:30",
      fileName: "신수진이력서_2024버전.pdf",
    },
    {
      id: 3,
      date: "2025-01-04 11:20",
      fileName: "신수진이력서_초안.pdf",
    },
    {
      id: 4,
      date: "2025-01-03 09:45",
      fileName: "신수진이력서_수정본.pdf",
    },
    {
      id: 5,
      date: "2025-01-02 14:15",
      fileName: "신수진이력서_최종.pdf",
    },
  ];

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(dummyResults.length / itemsPerPage);

  // 현재 페이지에 표시할 아이템들
  const currentItems = dummyResults.slice(
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
            {currentItems.map((result) => (
              <div
                key={result.id}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50"
              >
                <div className="col-span-1 pl-8 text-gray-600">{result.id}</div>
                <div className="col-span-3 text-center text-gray-600">
                  {result.date}
                </div>
                <div className="col-span-6 text-center text-gray-800">
                  {result.fileName}
                </div>
                <div className="col-span-2 text-center">
                  <button
                    className="px-4 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                    onClick={() =>
                      console.log(`View result for ${result.fileName}`)
                    }
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
