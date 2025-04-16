import { create } from "zustand";

interface InterviewState {
  interviewId: number | null;
  socket: WebSocket | null;
  recording: boolean;
  videoRecording: boolean;
  isLoading: boolean;

  setInterviewId: (id: number) => void;
  setSocket: (socket: WebSocket | null) => void;
  setRecording: (recording: boolean) => void;
  setVideoRecording: (recording: boolean) => void;
  setLoading: (loading: boolean) => void;
}

const useInterviewStore = create<InterviewState>((set) => ({
  interviewId: null,
  socket: null,
  recording: false,
  videoRecording: false,
  isLoading: false,

  setInterviewId: (id) => set({ interviewId: id }),
  setSocket: (socket) => set({ socket }),
  setRecording: (recording) => set({ recording }),
  setVideoRecording: (recording) => set({ videoRecording: recording }),
  setLoading: (loading) => set({ isLoading: loading }),
}));

export default useInterviewStore;
