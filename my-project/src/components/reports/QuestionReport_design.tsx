const questionData = [
  {
    id: 1,
    question:
      "Q1. 프론트엔드 개발자로서 TypeScript를 사용하는 이유와 주요 장점을 설명해주세요.",
    answer:
      "TypeScript를 사용하는 가장 큰 이유는 정적 타이핑으로 인해 코드 안정성이 높아지기 때문입니다. 실제 프로젝트에서 API 응답 타입이 변경될 때, TypeScript가 미리 오류를 감지해주어 디버깅 시간을 줄일 수 있었습니다. 또한, 자동완성 기능이 강화되어 협업 시 코드의 가독성이 좋아지고 생산성이 향상됩니다.",
    feedback: [
      "TypeScript의 주요 장점을 명확하게 설명하셨습니다.",
      `"TypeScript를 사용하면서 겪었던 문제와 해결 과정"을 예시로 들면 더 설득력 있는 답변이 될 것입니다.`,
      `"API 응답 타입이 변경되었을 때 어떤 에러가 발생했고, 이를 어떻게 해결했는지"를 언급하면 더욱 좋습니다.`,
    ],
  },
  {
    id: 2,
    question:
      "Q2. React의 상태 관리 도구로 Zustand를 사용하는 이유를 설명해주세요.",
    answer:
      "Zustand는 가볍고 간단한 API로 전역 상태를 관리할 수 있어서 사용합니다. Redux에 비해 설정이 간단하고, boilerplate 코드가 적으며, React의 컴포넌트 구조를 해치지 않아 유지보수가 용이합니다.",
    feedback: [
      "Zustand의 간결함을 강조하신 점이 좋습니다.",
      "Zustand와 Redux를 비교한 설명이 설득력을 높입니다.",
      "구체적인 예시 (예: 어떤 상태를 Zustand로 관리했는지)를 추가하면 더 좋습니다.",
    ],
  },
  {
    id: 3,
    question: "Q3. useRef 훅은 어떤 상황에서 사용하며, 그 이유는 무엇인가요?",
    answer:
      "useRef는 DOM에 직접 접근하거나 렌더링 간에 변경되지 않는 값을 저장할 때 사용합니다. 예를 들어, input 요소에 포커스를 줄 때나 이전 값을 기억할 때 유용합니다.",
    feedback: [
      "useRef의 주요 사용처를 잘 설명하셨습니다.",
      "예시가 명확하여 이해를 돕습니다.",
      "추가로, 상태 변화와 useRef의 차이를 비교해도 좋습니다.",
    ],
  },
];

const QuestionReport_design = () => {
  return (
    <div className="flex flex-col items-center justify-center mx-8 my-8 bg-white rounded-md shadow-md">
      {questionData.map((q) => (
        <div key={q.id} className="p-4 mx-12 space-y-6 w-[70rem]">
          {/* 질문 */}
          <div className="bg-[rgb(112,103,193)] px-4 py-3 mx-16 rounded-2xl text-white font-semibold tracking-wider">
            {q.question}
          </div>

          {/* 답변 + 피드백 통합 박스 */}
          <div className="p-6 mx-20 space-y-4 border border-gray-200 rounded-md bg-gray-50">
            {/* 답변 */}
            <div>
              <h3 className="mb-2 font-semibold text-gray-800">답변</h3>
              <p className="leading-relaxed text-gray-700">{q.answer}</p>
            </div>

            {/* 구분선 */}
            <hr className="border-gray-300" />

            {/* 피드백 */}
            <div>
              <h3 className="mb-2 font-semibold text-gray-800">AI 피드백</h3>
              <ul className="space-y-1 text-gray-700 list-disc list-inside">
                {q.feedback.map((f, index) => (
                  <li key={index}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionReport_design;
