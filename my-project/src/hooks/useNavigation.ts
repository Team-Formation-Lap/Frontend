import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goToHome: () => navigate("/"),
    goToInterview: (interviewId: number) =>
      navigate("/interview", { state: { interviewId } }),
    goToMyPage: () => navigate("/mypage"),
    goToReport: () => navigate("/report"),
  };
};

export default useNavigation;
