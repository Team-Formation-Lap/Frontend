import { create } from "zustand";

interface InterviewState {
  interviewId: number | null;
  socket: WebSocket | null;
  recording: boolean;
  videoRecording: boolean;
  isLoading: boolean;
  answerCount: number;
  maxAnswers: number;
  hasAutoEnded: boolean; // 자동 종료 실행 여부 추가

  setInterviewId: (id: number) => void;
  setSocket: (socket: WebSocket | null) => void;
  setRecording: (recording: boolean) => void;
  setVideoRecording: (recording: boolean) => void;
  setLoading: (loading: boolean) => void;
  incrementAnswerCount: () => void;
  resetAnswerCount: () => void;
  setMaxAnswers: (count: number) => void;
  setHasAutoEnded: (ended: boolean) => void; // 자동 종료 상태 설정
}

const useInterviewStore = create<InterviewState>((set, get) => ({
  interviewId: null,
  socket: null,
  recording: false,
  videoRecording: false,
  isLoading: false,
  answerCount: 0,
  maxAnswers: 3,
  hasAutoEnded: false,

  setInterviewId: (id) => set({ interviewId: id }),
  setSocket: (socket) => set({ socket }),
  setRecording: (recording) => set({ recording }),
  setVideoRecording: (recording) => set({ videoRecording: recording }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  incrementAnswerCount: () => {
    const currentCount = get().answerCount + 1;
    console.log(`📝 답변 횟수: ${currentCount}/${get().maxAnswers}`);
    set({ answerCount: currentCount });
  },
  
  resetAnswerCount: () => {
    console.log('🔄 답변 횟수 초기화');
    set({ answerCount: 0, hasAutoEnded: false }); // 자동 종료 상태도 초기화
  },
  
  setMaxAnswers: (count) => {
    console.log(`⚙️ 최대 답변 횟수 설정: ${count}개`);
    set({ maxAnswers: count });
  },

  setHasAutoEnded: (ended) => {
    console.log(`🎯 자동 종료 상태 변경: ${ended}`);
    set({ hasAutoEnded: ended });
  },
}));

export default useInterviewStore;
