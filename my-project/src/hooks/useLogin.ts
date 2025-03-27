import { useState } from "react";
// import useNavigation from "./useNavigation";
//onClose: () => void
const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const { goTo } = useNavigation();

  //   const goToSignUp = () => {
  //     onClose(); // 모달 닫고
  //     goTo("/signup"); // 회원가입 페이지로 이동
  //   };

  return {
    email,
    setEmail,
    password,
    setPassword,
    // goToSignUp,
  };
};

export default useLogin;
