// ---------- 타입 ---------- //
interface RawQA {
  // 서버가 주는 한 항목
  question: string;
  answer: string;
  feedback: string; // 긴 문장 하나
}

export interface QAItem {
  // 화면에서 쓸 구조
  id: number;
  question: string;
  answer: string;
  feedback: string[]; // bullet 배열
}

// ---------- 변환 유틸 ---------- //
export const toQAItems = (raw: RawQA[] | RawQA): QAItem[] => {
  const arr = Array.isArray(raw) ? raw : [raw];

  return arr.map((item, idx) => ({
    id: idx + 1,
    question: item.question,
    answer: item.answer,
    // 하이픈을 맨 앞(또는 맨 뒤)로 옮겨 escape 제거
    feedback: item.feedback
      .split(/[-\n•]+|(?<=\.)\s+/) // ← /[\n•-]+/ 도 OK
      .map((s) => s.replace(/^["“”\s]+|["“”\s]+$/g, "").trim())
      .filter(Boolean),
  }));
};
