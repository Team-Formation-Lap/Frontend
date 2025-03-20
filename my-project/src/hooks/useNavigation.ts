import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goToHome: () => navigate("/"),
    goToMyPage: () => navigate("/mypage"),
    goToReport: () => navigate("/report"),
  };
};

export default useNavigation;
