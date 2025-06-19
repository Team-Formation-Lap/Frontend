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
  ];

  return (
    <div className="bg-white mx-8 my-8 py-4 shadow-md rounded-md ">
      <div className="p-4 space-y-6 mx-12">
        {/* 영상 플레이어 */}
        <div className="w-full mb-6">
          <video
            className="w-full rounded-md"
            controls
            poster="https://via.placeholder.com/800x450.png?text=Video+Thumbnail"
          >
            <source src={interviewVideo_song} type="video/mp4" />
            사용 중인 브라우저는 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
        <h3 className="text-lg font-semibold mb-4">AI 피드백</h3>
        <ul className="space-y-4">
          {feedbackList.map((item, index) => (
            <li
              key={index}
              className="border-t pt-4 first:border-t-0 first:pt-0"
            >
              <div className="flex items-start">
                <button className="flex-shrink-0 bg-gray-100 border-dotted border text-black font-bold px-3 py-1 rounded-full mr-4 ">
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
