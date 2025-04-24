//StartPage에서 사용되는 훅

//openUploadingModal 핸들러
const useStartPage = (
  openUploadingModal: () => void,
  openLoginModal: () => void,
  openSignupModal: () => void,
  openUploadingModal2: () => void
) => {
  const handleStartClick = () => {
    console.log("이력서 등록하기 버튼 클릭 -> ResumeUploadModal 열림");
    openUploadingModal();
  };
  const handleStartClick2 = () => {
    console.log("면접 바로 시작하기 버튼 클릭 -> ResumeUploadModal2 열림");
    openUploadingModal2();
  };
  const handleLoginClick = () => {
    console.log("로그인 버튼 클릭 -> LoginModal 열림");
    openLoginModal();
  };
  const handleSignupClick = () => {
    console.log("회원가입 버튼 클릭 -> SignupModal 열림");
    openSignupModal();
  };

  return {
    handleStartClick,
    handleStartClick2,
    handleLoginClick,
    handleSignupClick,
  };
};

export default useStartPage;
