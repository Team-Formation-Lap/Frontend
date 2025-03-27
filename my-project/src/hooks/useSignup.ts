import { useState } from "react";
import { checkEmailExists, registerUser } from "../api/signupAPI";

const useSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 이메일 중복 확인
  const checkDuplicateEmail = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await checkEmailExists(email);
      if (response.message === "사용 가능한 이메일입니다.") {
        setIsEmailVerified(true);
        alert("사용 가능한 이메일입니다.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsEmailVerified(false);
      alert("이미 사용 중인 이메일입니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입 처리
  const handleSignup = async () => {
    // 입력값 검증
    if (!name || !email || !password || !confirmPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (!isEmailVerified) {
      alert("이메일 중복 확인을 해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      alert("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    try {
      setIsLoading(true);
      await registerUser({
        email,
        nickname: name,
        password,
      });

      alert("회원가입이 완료되었습니다.");
      // 여기에 회원가입 성공 후 처리 (예: 모달 닫기, 로그인 페이지로 이동 등)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 이메일 입력 시 검증 상태 초기화
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsEmailVerified(false);
  };

  return {
    name,
    setName,
    email,
    setEmail: handleEmailChange,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    checkDuplicateEmail,
    handleSignup,
    isEmailVerified,
    isLoading,
  };
};

export default useSignup;
