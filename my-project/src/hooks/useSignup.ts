import { useState } from "react";

const useSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkDuplicateEmail = () => {
    console.log("이메일 중복 확인:", email);
    // TODO: 중복 확인 API 연동
  };

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log("회원가입 요청", { name, email, password });
    // TODO: 회원가입 API 연동
  };

  return {
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
  };
};

export default useSignup;
