const ComprehensiveReport = () => {
  return (
    <div className="mx-2 mt-2 bg-gray-100 rounded-b-lg min-h-[600px]">
      <div className="grid grid-cols-2 gap-6">
        {/* 1️⃣ 영상 영역 */}
        <div className="bg-white rounded-lg shadow-lg">
          <video className="w-full h-auto rounded-lg" controls>
            <source src="your-video-url.mp4" type="video/mp4" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </div>

        {/* 2️⃣ 종합 점수 그래프 */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
          <span className="text-gray-500 text-lg">종합 점수 그래프</span>
        </div>

        {/* 3️⃣ 잘한 점 */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center min-h-[200px]">
          <span className="text-black font-semibold">잘한 점</span>
        </div>

        {/* 4️⃣ 못한 점 */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-center min-h-[200px]">
          <span className="text-black font-semibold">
            못한 점
            <br />
            못한 점 못한 점 못한 점 못한 점 ㅍ못한 점 못한 점 못한 점 못한 점
            못한 점 못한 점 못한 점 못한 점 못한 점 못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
            못한 점
            <br />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveReport;
