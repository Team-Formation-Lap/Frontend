import book from "../assets/book.svg";
import flyingBusinessman from "../assets/flyingBusinessman.svg";
import flyingBusinesswoman from "../assets/flyingBusinesswoman.svg";
import Robot from "../assets/Robot.svg";
import Myheader from "../components/header";
const StartPage = () => {
  return (
    <div className="flex flex-col h-screen ">
      {/* 헤더 */}
      <Myheader />
      {/* 메인 컨텐츠 */}
      <main className="flex flex-1 items-center justify-center px-16">
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

          <button className="px-8 py-3 font-museo text-lg font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest relative top-4">
            면접 시작하기
          </button>
        </div>

        {/* 우측 이미지 */}
        <div className="relative w-1/2 h-[500px]">
          {/* 보라색 모형 */}
          <div className="absolute w-[810px] h-[380px] bg-gradient-to-b from-[#6859ED] to-[#FF94D6] rounded-l-full top-16 right-[-60px] opacity-80 z-0"></div>

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
