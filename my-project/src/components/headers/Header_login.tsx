import useNavigation from "../../hooks/useNavigation";

const Header_login = () => {
  const { goToHome } = useNavigation();

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
          <button className="px-4 py-2 text-gray-700 border rounded-md hover:bg-gray-100">
            로그아웃
          </button>
          <button className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
            마이페이지
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header_login;
