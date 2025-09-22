import Modal from "./Modal";
import { useLogin } from "../../hooks/useLogin";
import useAuthStore from "../../store/authStore";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignupClick: () => void;
}

const LoginModal = ({ isOpen, onClose, onSignupClick }: LoginModalProps) => {
  const { email, password, setEmail, setPassword, login, loading, errorMessage } = useLogin();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleLogin = async () => {
    await login();
    
    // 로그인 성공 시 모달 닫기 (Zustand 스토어의 isLoggedIn 상태 확인)
    if (useAuthStore.getState().isLoggedIn) {
      onClose();
      alert("로그인 되었습니다!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleLogin();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="w-[500px]" height="h-auto">
      <div className="text-center font-museo space-y-6 px-4 py-6">
        <div className="space-y-2">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold font-museo bg-gradient-to-b from-[#AAA0FF] via-[#4C40B5] to-[#2A1E95] text-transparent bg-clip-text">
              IntelliView
            </h1>
          </div>
          <p className="text-base font-semibold text-gray-600">
            AI 기반 모의면접 서비스
          </p>
        </div>

        <div className="space-y-4 text-left">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              아이디
            </label>
            <input
              type="email"
              placeholder="intelliview@example.com"
              className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C3BFF]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="6자리 이상"
              className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C3BFF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-md">
              {errorMessage}
            </div>
          )}
        </div>

        <button
          className="w-full bg-[#5C3BFF] text-white py-2 rounded-full font-semibold hover:bg-[#4b2fe6] transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleLogin}
          disabled={loading || !email || !password}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-sm text-gray-500">
          아직 회원이 아니세요?{" "}
          <button
            onClick={onSignupClick}
            className="text-[#5C3BFF] font-semibold hover:underline ml-2"
            disabled={loading}
          >
            회원가입
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default LoginModal;
