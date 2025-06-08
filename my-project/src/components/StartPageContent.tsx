import { IMAGES } from "../utils/constants";

interface StartPageContentProps {
  handleStartClick: () => void;
  handleStartClick2: () => void;
}

const StartPageContent = ({
  handleStartClick,
  handleStartClick2,
}: StartPageContentProps) => {
  return (
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

        <div className="pt-6 space-y-1">
          <p className="text-sm font-semibold text-gray-600 ml-2">
            Intelliview가 처음이라면?
          </p>
          <div className="flex gap-4">
            <button
              className="px-8 py-4 font-museo text-base font-semibold text-white bg-purple-400 rounded-md hover:bg-purple-500 tracking-widest"
              onClick={handleStartClick}
            >
              지원서 등록하기
            </button>
            <button
              className="px-6 font-museo text-base font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest"
              onClick={handleStartClick2}
            >
              면접 바로 시작하기
            </button>
          </div>
        </div>
      </div>

      {/* 우측 이미지 */}
      <div className="relative w-1/2 h-[500px]">
        {/* 보라색 모형 */}
        <div className="fixed w-[810px] h-[380px] bg-gradient-to-b from-[#6859ED] to-[#FF94D6] rounded-l-full top-60 right-0 opacity-80 z-0"></div>

        {/* 이미지들 */}
        <img
          src={IMAGES.book}
          alt="Book"
          className="fixed w-32 bottom-40 right-80 animate-float"
        />
        <img
          src={IMAGES.flyingBusinessman}
          alt="Flying Businessman"
          className="fixed w-1/3 top-60 right-96 animate-float-slow"
        />
        <img
          src={IMAGES.flyingBusinesswoman}
          alt="Flying Businesswoman"
          className="fixed w-80 bottom-40 right-0 animate-float-fast"
        />
        <img
          src={IMAGES.robot}
          alt="Robot"
          className="fixed w-32 top-50 right-40 animate-float-fast"
        />
      </div>
    </main>
  );
};

export default StartPageContent;
