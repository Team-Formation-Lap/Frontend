// hooks/useAutoInterviewEnd.ts
import { useEffect } from 'react';
import useInterviewStore from '../store/useInterviewStore';

interface UseAutoInterviewEndProps {
  uploadVideo: () => Promise<void>;
}

const useAutoInterviewEnd = ({ uploadVideo }: UseAutoInterviewEndProps) => {
  const { answerCount, maxAnswers, hasAutoEnded, setHasAutoEnded } = useInterviewStore();

  // 답변 횟수가 최대치에 도달했을 때 자동 종료
  useEffect(() => {
    if (answerCount >= maxAnswers && answerCount > 0 && !hasAutoEnded) {
      console.log(`🎯 ${maxAnswers}번의 답변 완료 - 자동 면접 종료`);
      setHasAutoEnded(true); // 중복 실행 방지
      
      // 성공 알림
      alert(`🎉 ${maxAnswers}개의 질문에 모두 답변하셨습니다!\n면접이 완료되었습니다.`);
      
      // 짧은 지연 후 기존 면접 종료 로직 실행
      setTimeout(() => {
        uploadVideo();
      }, 2000);
    }
  }, [answerCount, maxAnswers, hasAutoEnded, setHasAutoEnded]); // uploadVideo 제외

  return {
    shouldAutoEnd: hasAutoEnded || answerCount >= maxAnswers,
    remainingAnswers: Math.max(0, maxAnswers - answerCount),
  };
};

export default useAutoInterviewEnd;
