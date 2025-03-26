import Modal from "./Modal";
import useLogin from "../../hooks/useLogin";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { email, password, setEmail, setPassword } = useLogin();

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="w-[350px]" height="h-auto">
      <div className="text-center font-museo space-y-6">
        <h1 className="text-3xl font-bold text-[#5C3BFF]">IntelliView</h1>
        <p className="text-sm text-gray-600">AI 기반 모의면접 서비스</p>

        <div className="space-y-4 text-left">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              아이디
            </label>
            <input
              type="email"
              placeholder="intelliview@example.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C3BFF]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="6자리 이상"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C3BFF]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full bg-[#5C3BFF] text-white py-2 rounded-full font-semibold hover:bg-[#4b2fe6] transition"
          onClick={() => {}}
        >
          로그인
        </button>

        <p className="text-sm text-gray-500">
          아직 회원이 아니세요?{" "}
          <button
            // onClick={goToSignUp}
            className="text-[#5C3BFF] font-semibold hover:underline"
          >
            회원가입
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default LoginModal;
