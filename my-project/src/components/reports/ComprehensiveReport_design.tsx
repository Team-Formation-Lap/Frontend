import interviewVideo_song from "../../assets/interviewVideo_song.webm";

const ComprehensiveReport_design = () => {
  return (
    <div className="bg-white mx-8 my-8 py-4 shadow-md rounded-md">
      <div className="p-4 space-y-6 mx-12">
        {/* 상단: 영상과 종합 피드백 */}
        <div className="grid grid-cols-2 gap-8">
          {/* 임의의 영상 */}
          <div className="w-full h-full">
            <video
              controls
              className="w-full rounded-md shadow"
              src={interviewVideo_song}
            />
          </div>

          {/* 종합적인 피드백 */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h2 className="font-semibold text-lg mb-2">종합적인 피드백</h2>
            <p className="text-gray-700 leading-relaxed">
              지원자는 Skeleton UI를 중심으로 사용자 경험 개선 사례를 논리적으로
              설명하며, 실무 경험을 효과적으로 전달하고자 한 점이 인상적입니다.
              특히 데이터 로딩 지연 문제를 해결하기 위한 접근 방식과 유사
              프로젝트에서의 일관된 전략 적용은 강점입니다. 다만 일부 표현은
              추상적이거나 반복적으로 사용되어 설득력이 떨어질 수 있으며, 도구의
              도입 배경과 성과를 더 구체적으로 연결할 필요가 있습니다. 행동
              면에서는 시선 이탈, 어깨 기울임, 손의 불필요한 움직임 등이
              반복적으로 나타나 긴장감과 불안감을 드러냈습니다. 이는 면접관에게
              신뢰를 주는 데 방해가 될 수 있으므로 눈맞춤 유지, 정자세, 손의
              위치 고정 등의 반복 연습이 필요합니다. 전체적으로는 경험과 역량을
              바탕으로 한 설명력은 충분하나, 전달력과 비언어적 표현의 안정성이
              보완된다면 더욱 강한 인상을 남길 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveReport_design;
