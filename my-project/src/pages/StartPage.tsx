import Header from "../components/headers/Header";
import StartPageContent from "../components/StartPageContent";
import useStartPage from "../hooks/useStartPage";

interface StartPageProps {
  openUploadingModal: () => void; // 이력서 업로드 모달 열기 핸들러
  openUploadingModal2: () => void; // 이력서 업로드 모달 열기 핸들러
  openLoginModal: () => void; // 이력서 업로드 모달 열기 핸들러
  openSignupModal: () => void; // 이력서 업로드 모달 열기 핸들러
}

const StartPage = ({
  openUploadingModal,
  openUploadingModal2,
  openLoginModal,
  openSignupModal,
}: StartPageProps) => {
  const {
    handleStartClick,
    handleLoginClick,
    handleSignupClick,
    handleStartClick2,
  } = useStartPage(
    openUploadingModal,
    openLoginModal,
    openSignupModal,
    openUploadingModal2
  );

  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <Header
        handleLoginClick={handleLoginClick}
        handleSignupClick={handleSignupClick}
      />
      {/* 메인 컨텐츠 */}
      <StartPageContent
        handleStartClick={handleStartClick}
        handleStartClick2={handleStartClick2}
      />
    </div>
  );
};

export default StartPage;
