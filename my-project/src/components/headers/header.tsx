import useNavigation from "../../hooks/useNavigation";
import useAuthStore from "../../store/authStore";
import { useAuthValidation } from "../../hooks/useAuthValidation";
import { handleLogout } from "../../utils/authUtils";
import { useEffect } from "react";

interface HeaderProps {
  handleLoginClick: () => void;
  handleSignupClick: () => void;
}

const Header = ({ handleLoginClick, handleSignupClick }: HeaderProps) => {
  const { goToHome, goToMyPage } = useNavigation();
  const { isLoggedIn, nickname } = useAuthStore();
  const { isChecking } = useAuthValidation();

  useEffect(() => {
    console.log("인증 상태:", { isLoggedIn, nickname, isChecking });
  }, [isLoggedIn, nickname, isChecking]);

  const handleLogoutClick = async () => {
    await handleLogout();
    console.log("로그아웃 되었습니다.");
    alert("로그아웃 되었습니다!");
  };

  return (
    <div>
      {/* 헤더 */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <button
          className="text-3xl font-bold font-museo bg-gradient-to-b from-[#AAA0FF] via-[#4C40B5] to-[#2A1E95] text-transparent bg-clip-text"
          onClick={goToHome}
        >
          IntelliView
        </button>
        
        <div className="flex space-x-4">
          {isChecking ? (
            // 인증 확인 중일 때 로딩 상태 표시 (짧은 시간만)
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-500">확인 중...</span>
            </div>
          ) : isLoggedIn ? (
            // 인증 확인 완료 + 로그인 상태
            <>
              <span className="flex items-center px-3 py-2 text-sm text-gray-600">
                안녕하세요, {nickname}님
              </span>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100 transition"
              >
                로그아웃
              </button>
              <button
                onClick={goToMyPage}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
              >
                마이페이지
              </button>
            </>
          ) : (
            // 인증 확인 완료 + 비로그인 상태
            <>
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100 transition"
              >
                로그인
              </button>
              <button
                onClick={handleSignupClick}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
