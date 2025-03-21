//StartPage에서 사용되는 훅

//openUploadingModal 핸들러
const useStartPage = (openUploadingModal: () => void) => {
  const handleStartClick = () => {
    console.log("모달 열기 버튼 클릭됨");
    openUploadingModal();
  };

  return { handleStartClick };
};

export default useStartPage;
