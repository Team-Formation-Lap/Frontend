const ComprehensiveReport_design = () => {
  return (
    <div className="bg-white mx-16 my-12 py-4 shadow-md rounded-md">
      <div className="p-4 space-y-6 mx-12">
        {/* 상단: 영상과 종합 피드백 */}
        <div className="grid grid-cols-2 gap-8">
          {/* 임의의 영상 */}
          <div className="w-full h-full">
            <video
              controls
              className="w-full rounded-md shadow"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
            />
          </div>

          {/* 종합적인 피드백 */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h2 className="font-semibold text-lg mb-2">종합적인 피드백</h2>
            <p className="text-gray-700 leading-relaxed">
              여기에 AI가 분석한 종합 피드백 내용을 입력해주세요.
            </p>
          </div>
        </div>

        {/* 하단: 잘한점 / 못한점 */}
        <div className="grid grid-cols-2 gap-8">
          {/* 잘한점 */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h2 className="font-semibold text-lg mb-2">잘한점</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1"></ul>
          </div>

          {/* 못한점 */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h2 className="font-semibold text-lg mb-2">못한점</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1"></ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveReport_design;
