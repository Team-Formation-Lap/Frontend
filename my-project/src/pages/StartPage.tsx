import Header_login from "../components/headers/Header_login";
import StartPageContent from "../components/StartPageContent";
import useStartPage from "../hooks/useStartPage";

interface StartPageProps {
  openUploadingModal: () => void; // 이력서 업로드 모달 열기 핸들러
}

const StartPage = ({ openUploadingModal }: StartPageProps) => {
  const { handleStartClick } = useStartPage(openUploadingModal);

  return (
    <div className="flex flex-col h-screen">
      {/* 헤더 */}
      <Header_login />
      {/* 메인 컨텐츠 */}
      <StartPageContent handleStartClick={handleStartClick} />
    </div>
  );
};

export default StartPage;
