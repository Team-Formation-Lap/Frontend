import useNavigation from "../../hooks/useNavigation";
import useAuthStore from "../../store/authStore";
import { useEffect } from "react";

interface HeaderProps {
  handleLoginClick: () => void;
  handleSignupClick: () => void;
}

const Header = ({ handleLoginClick, handleSignupClick }: HeaderProps) => {
  const { goToHome, goToMyPage } = useNavigation();
  const { isLoggedIn, logout } = useAuthStore();

  useEffect(() => {
    console.log("현재 로그인 상태:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      {/* 헤더 */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <button
          className="text-3xl font-bold font-museo bg-gradient-to-b from-[#AAA0FF] via-[#4C40B5] to-[#2A1E95] text-transparent bg-clip-text"
          onClick={goToHome} // 클릭 이벤트 핸들러
        >
          IntelliView
        </button>
        <div className="flex space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  logout();
                  console.log("로그아웃 되었습니다.");
                  alert("로그아웃 되었습니다!");
                }}
                className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
              >
                로그아웃
              </button>
              <button
                onClick={goToMyPage}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                마이페이지
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100"
              >
                로그인
              </button>
              <button
                onClick={handleSignupClick}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
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
