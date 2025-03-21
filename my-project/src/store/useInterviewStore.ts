import { create } from "zustand";

interface InterviewState {
  interviewId: number | null;
  socket: WebSocket | null;
  recording: boolean;
  videoRecording: boolean;

  setInterviewId: (id: number) => void;
  setSocket: (socket: WebSocket | null) => void;
  setRecording: (recording: boolean) => void;
  setVideoRecording: (recording: boolean) => void;
}

const useInterviewStore = create<InterviewState>((set) => ({
  interviewId: null,
  socket: null,
  recording: false,
  videoRecording: false,

  setInterviewId: (id) => set({ interviewId: id }),
  setSocket: (socket) => set({ socket }),
  setRecording: (recording) => set({ recording }),
  setVideoRecording: (recording) => set({ videoRecording: recording }),
}));

export default useInterviewStore;
