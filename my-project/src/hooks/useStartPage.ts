//StartPage에서 사용되는 훅

//openUploadingModal 핸들러
const useStartPage = (
  openUploadingModal: () => void,
  openLoginModal: () => void,
  openSignupModal: () => void
) => {
  const handleStartClick = () => {
    console.log("이력서 업로드 모달 열기 버튼 클릭됨");
    openUploadingModal();
  };
  const handleLoginClick = () => {
    console.log("로그인 모달 열기 버튼 클릭됨");
    openLoginModal();
  };
  const handleSignupClick = () => {
    console.log("회원가입 모달 열기 버튼 클릭됨");
    openSignupModal();
  };

  return { handleStartClick, handleLoginClick, handleSignupClick };
};

export default useStartPage;
