import book from "../assets/book.svg";
import flyingBusinessman from "../assets/flyingBusinessman.svg";
import flyingBusinesswoman from "../assets/flyingBusinesswoman.svg";
import Robot from "../assets/Robot.svg";

const StartPage = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <h1 className="text-3xl font-bold font-museo bg-gradient-to-b from-[#AAA0FF] via-[#4C40B5] to-[#2A1E95] text-transparent bg-clip-text">
          IntelliView
        </h1>
        <div className="flex space-x-4">
          <button className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100">
            로그인
          </button>
          <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            회원가입
          </button>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 items-center justify-center px-16">
        {/* 좌측 텍스트 & 버튼 */}
        <div className="w-1/2 space-y-4">
          <p className="text-3xl font-museo ">
            내가 주인공인 순간, 시작은 여기에서!
          </p>
          <h2 className="text-5xl font-museo font-bold leading-tight text-white tracking-normal">
            맞춤형 피드백과 <br /> 전문적인 분석으로 <br /> 나만의 이야기를
            완성하는
          </h2>
          <h2 className="text-5xl font-museo font-bold text-indigo-300 tracking-wide">
            AI 모의면접 서비스
          </h2>
          <button className="px-8 py-3 mt-4 font-museo text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest">
            면접 시작하기
          </button>
        </div>

        {/* 우측 이미지 */}
        <div className="relative w-1/2 h-[500px]">
          {/* 책 */}
          <img
            src={book}
            alt="Book"
            className="absolute w-28 top-10 left-12 animate-float"
          />
          {/* 남자 */}
          <img
            src={flyingBusinessman}
            alt="Flying Businessman"
            className="absolute w-52 top-20 left-36 animate-float-slow"
          />
          {/* 여자 */}
          <img
            src={flyingBusinesswoman}
            alt="Flying Businesswoman"
            className="absolute w-44 bottom-10 right-16 animate-float-fast"
          />
          {/* 로봇 */}
          <img
            src={Robot}
            alt="Robot"
            className="absolute w-24 top-5 right-5 animate-bounce"
          />
        </div>
      </main>
    </div>
  );
};

export default StartPage;
