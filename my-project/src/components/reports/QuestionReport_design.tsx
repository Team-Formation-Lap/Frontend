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
  {
    id: 4,
    question: "Q4. 디자인 시스템이 무엇이며, 왜 도입해야 하는지 설명해주세요.",
    answer:
      "디자인 시스템은 일관된 UI를 만들기 위한 컴포넌트, 가이드, 패턴의 집합입니다. 팀원 간 협업 시 일관성을 유지하고, UI 개발 속도를 높일 수 있으며, 유지보수도 쉬워집니다.",
    feedback: [
      "디자인 시스템의 정의와 장점을 잘 설명하셨습니다.",
      "실제 경험을 바탕으로 도입 시의 변화가 있으면 더 좋습니다.",
      "구성 요소(예: 색상, 타이포그래피, 컴포넌트 등)에 대해 언급해보세요.",
    ],
  },
  {
    id: 5,
    question:
      "Q5. React 프로젝트에서 코드 스플리팅을 사용하는 이유는 무엇인가요?",
    answer:
      "코드 스플리팅은 필요한 시점에 필요한 코드만 불러오기 위해 사용합니다. 초기 로딩 속도를 줄이고, 사용자 경험을 개선할 수 있습니다.",
    feedback: [
      "코드 스플리팅의 목적을 명확히 설명하셨습니다.",
      "React.lazy와 Suspense와 함께 사용하는 예시를 추가해보세요.",
      "실제 프로젝트에서 적용했던 경험을 곁들이면 좋습니다.",
    ],
  },
  {
    id: 6,
    question:
      "Q6. React 컴포넌트의 재사용성을 높이기 위한 방법을 설명해주세요.",
    answer:
      "컴포넌트의 역할을 명확히 나누고, props를 통해 유연하게 조절할 수 있도록 설계합니다. 또한, 공통 로직은 커스텀 훅으로 분리하여 재사용성을 높입니다.",
    feedback: [
      "컴포넌트 구조 설계에 대한 이해도가 드러납니다.",
      "props 기반 설계의 중요성을 잘 언급하셨습니다.",
      "더 구체적인 사례나 커스텀 훅 예시를 들면 좋습니다.",
    ],
  },
];

const QuestionReport_design = () => {
  return (
    <div className="bg-white mx-8 my-8 py-4 shadow-md rounded-md ">
      {questionData.map((q) => (
        <div key={q.id} className="p-4 space-y-6 mx-12">
          {/* 질문 */}
          <div className="bg-[#7067C1] px-4 py-3 mx-16 rounded-2xl text-white font-semibold tracking-wider">
            {q.question}
          </div>

          {/* 답변 + 피드백 통합 박스 */}
          <div className="bg-gray-50 p-6 mx-20 rounded-md border border-gray-200 space-y-4">
            {/* 답변 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">답변</h3>
              <p className="text-gray-700 leading-relaxed">{q.answer}</p>
            </div>

            {/* 구분선 */}
            <hr className="border-gray-300" />

            {/* 피드백 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">AI 피드백</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
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
