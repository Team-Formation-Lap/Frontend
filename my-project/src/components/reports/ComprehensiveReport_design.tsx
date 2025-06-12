import interviewVideo_song from "../../assets/interviewVideo_song.webm";

const ComprehensiveReport_design = () => {
  return (
    <div className="bg-white mx-8 my-8 py-4 shadow-md rounded-md">
      <div className="p-4 space-y-6 mx-12">
        <div className="flex w-full h-full px-8 py-12">
          {/* 왼쪽: 텍스트 + 비디오 */}
          <div className="w-1/2 flex flex-col space-y-3">
            <div>
              <p className="text-xl font-semibold text-[#5865c5] ">
                새로운 도전을 하는
              </p>
              <h1 className="text-4xl font-black mt-1 ">
                신수진님의 첫 번째 면접
              </h1>
            </div>

            <div>
              <h2 className="text-lg font-black font-[monospace] mt-4">
                AI Summary
              </h2>
              <p className="text-gray-700 mt-1 leading-relaxed">
                지원자의 답변은 전체적으로 논리적이며 주제에 집중되어 있어
                설득력이 높았습니다. 특히 사례를 들어 설명하는 방식이 인상
                깊었고, 질문의 의도를 잘 파악하여 핵심적인 내용을 전달하는
                능력이 돋보였습니다. 또한 눈맞춤, 자세, 손동작 등 비언어적
                표현도 자연스럽고 안정되어 있어 면접 전반에 긍정적인 인상을
                주었습니다.
              </p>
            </div>

            <div className="mt-4">
              {/* 비디오 자리 */}
              <video
                controls
                className="w-full h-64 bg-black rounded-md shadow flex items-center justify-center text-white"
              >
                비디오 자리 src={interviewVideo_song}
              </video>
            </div>
          </div>

          {/* 오른쪽: 차트 자리 */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-5/6 h-[500px] bg-gray-100 rounded-xl shadow-inner flex items-center justify-center text-gray-400 text-xl">
              차트 영역 (예: 레이더 차트)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveReport_design;
