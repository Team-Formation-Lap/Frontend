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
    isEmailVerified,
    isLoading,
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
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              아이디
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="intelliview@example.com"
                  className={`mt-1 w-full px-4 py-2 bg-gray-100 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5C3BFF] ${
                    isEmailVerified ? "border-2 border-green-500" : ""
                  }`}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  disabled={isLoading || isEmailVerified}
                />
                {isEmailVerified && (
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                    ✓
                  </span>
                )}
              </div>
              <button
                className={`mt-1 px-4 py-2 text-sm font-semibold text-white rounded-md whitespace-nowrap transition ${
                  isEmailVerified
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-[#5C3BFF] hover:bg-[#4b2fe6]"
                }`}
                onClick={checkDuplicateEmail}
                disabled={isLoading || isEmailVerified || !email}
              >
                {isEmailVerified ? "확인완료" : "중복확인"}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          className={`w-full py-2 rounded-full font-semibold transition ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#5C3BFF] hover:bg-[#4b2fe6]"
          } text-white`}
          onClick={handleSignup}
          disabled={isLoading || !isEmailVerified}
        >
          {isLoading ? "처리 중..." : "회원가입"}
        </button>
      </div>
    </Modal>
  );
};

export default SignupModal;
