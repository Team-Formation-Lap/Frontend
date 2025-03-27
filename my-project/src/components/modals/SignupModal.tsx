import Modal from "./Modal";
import useSignup from "../../hooks/useSignup";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    checkDuplicateEmail,
    handleSignup,
  } = useSignup();

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
            <label className="text-sm font-semibold text-gray-700">이름</label>
            <input
              type="text"
              className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#5C3BFF]"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              아이디
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="intelliview@example.com"
                className="mt-1 flex-1 px-4 py-2 bg-gray-100 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C3BFF]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="mt-1 px-4 py-2 text-sm font-semibold text-white bg-[#5C3BFF] rounded-md hover:bg-[#4b2fe6] transition whitespace-nowrap"
                onClick={checkDuplicateEmail}
              >
                중복확인
              </button>
            </div>
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
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요"
              className="mt-1 w-full px-4 py-2 bg-gray-100 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C3BFF]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          className="w-full bg-[#5C3BFF] text-white py-2 rounded-full font-semibold hover:bg-[#4b2fe6] transition mt-4"
          onClick={handleSignup}
        >
          회원가입
        </button>
      </div>
    </Modal>
  );
};

export default SignupModal;
