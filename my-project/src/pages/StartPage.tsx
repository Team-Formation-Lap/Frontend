import { useState } from "react";
import ResumeUploadModal from "../components/modals/ResumeUploadModal";
import book from "../assets/book.svg";
import flyingBusinessman from "../assets/flyingBusinessman.svg";
import flyingBusinesswoman from "../assets/flyingBusinesswoman.svg";
import Robot from "../assets/Robot.svg";
import Header from "../components/Header";
import "../index.css";

const StartPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen ">
      {/* 헤더 */}
      <Header />
      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 items-center justify-center px-16 ">
        {/* 좌측 텍스트 & 버튼 */}
        <div className="w-1/2 space-y-4">
          <p className="text-3xl font-museo text-gray-700 font-semibold">
            내가 주인공인 순간, 시작은 여기에서!
          </p>
          <h2 className="text-5xl font-museo font-bold tracking-normal leading-[1.5]">
            맞춤형 피드백과 <br /> 전문적인 분석으로 <br /> 나만의 이야기를
            완성하는
          </h2>
          <h2 className="text-5xl font-museo font-bold bg-gradient-to-b from-[#312594] via-[#4F41CE] to-[#8072F8] text-transparent bg-clip-text tracking-wide">
            AI 모의면접 서비스
          </h2>

          <button
            onClick={() => setOpen(true)}
            className="px-8 py-3 font-museo text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest relative top-4"
          >
            면접 시작하기
          </button>
        </div>
        <ResumeUploadModal
          isOpen={open}
          onClose={() => setOpen(false)}
        ></ResumeUploadModal>
        {/* 우측 이미지 */}
        <div className="relative w-1/2 h-[500px]">
          {/* 보라색 모형 */}
          <div className="fixed w-[810px] h-[380px] bg-gradient-to-b from-[#6859ED] to-[#FF94D6] rounded-l-full top-60 right-0 opacity-80 z-0"></div>

          {/* 책 */}
          <img
            src={book}
            alt="Book"
            className="fixed w-32 bottom-40 right-80 animate-float"
          />
          {/* 남자 */}
          <img
            src={flyingBusinessman}
            alt="Flying Businessman"
            className="fixed w-1/3 top-60 right-96 animate-float-slow"
          />
          {/* 여자 */}
          <img
            src={flyingBusinesswoman}
            alt="Flying Businesswoman"
            className="fixed w-80 bottom-40 right-0 animate-float-fast"
            style={{ right: 0 }}
          />
          {/* 로봇 */}
          <img
            src={Robot}
            alt="Robot"
            className="fixed w-32 top-50 right-40 animate-float-fast"
          />
        </div>
      </main>
    </div>
  );
};

export default StartPage;
