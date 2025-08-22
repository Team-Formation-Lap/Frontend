import interviewVideo_song from "../../assets/interviewVideo_song.webm";

const BehaviorReport_design = () => {
  const feedbackList = [
    {
      time: "02:33",
      bold: "팔짱을 낀 자세는",
      text: "방어적인 태도로 보일 수 있습니다. 손 사이의 거리를 조금 더 좁히거나 자연스럽게 손을 내려보는 것도 좋은 방법입니다.",
    },
    {
      time: "05:21",
      bold: "어깨가 한쪽으로 기울어지면",
      text: "긴장해 보일 수 있습니다. 조금 더 정자세를 유지하면 자신감 있는 인상을 줄 수 있습니다.",
    },
    {
      time: "11:15",
      bold: "손을 갑자기 움직이면",
      text: "면접관이 산만하게 느낄 수 있습니다. 제스처는 천천히, 그리고 명확하게 사용하는 것이 좋습니다.",
    },
    {
      time: "07:42",
      bold: "시선을 자주 돌리면",
      text: "집중력이 부족해 보일 수 있습니다. 질문을 듣고 대답할 때는 면접관의 눈을 자연스럽게 바라보는 것이 좋습니다.",
    },
  ];

  return (
    <div className="py-4 mx-8 my-8 bg-white rounded-md shadow-md ">
      <div className="flex justify-center p-4 mx-12 space-y-6 px-auto">
        {/* 영상 플레이어 */}
        <div className="flex justify-center w-[50rem] mb-6">
          <video
            className="w-full rounded-md"
            controls
            poster="https://via.placeholder.com/800x450.png?text=Video+Thumbnail"
          >
            <source src={interviewVideo_song} type="video/mp4" />
            사용 중인 브라우저는 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
        <ul className="mx-10 space-y-4">
          {feedbackList.map((item, index) => (
            <li
              key={index}
              className="pt-4 border-t first:border-t-0 first:pt-0"
            >
              <h3 className="mb-4 text-lg font-semibold">AI 피드백</h3>

              <div className="flex items-start">
                <button className="flex-shrink-0 px-3 py-1 mr-4 font-bold text-black bg-gray-100 border border-dotted rounded-full ">
                  {item.time}
                </button>
                <p className="text-sm leading-relaxed">
                  <span className="font-bold">{item.bold}</span> {item.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BehaviorReport_design;
