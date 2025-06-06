import "./App.css";
import "./index.css";
import StartPage from "./pages/StartPage";
import InterviewPage from "./pages/InterviewPage";
import ReportPage from "./pages/ReportPage";
import DesignPage from "./pages/DesignPage";
import ArchivedReportPage from "./pages/ArchivedReportPage";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeUploadModal from "./components/modals/ResumeUploadModal";
import ResumeUploadModal2 from "./components/modals/ResumeUploadModal2";
import ResumeManageModal from "./components/modals/ResumeManageModal";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import MyPage from "./pages/MyPage";

function App() {
  const [isUploadingModalOpen, setIsUploadingModalOpen] = useState(false);
  const [isUploadingModalOpen2, setIsUploadingModalOpen2] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openUploadingModal = () => setIsUploadingModalOpen(true);
  const closeUploadingModal = () => setIsUploadingModalOpen(false);
  const openUploadingModal2 = () => setIsUploadingModalOpen2(true);
  const closeUploadingModal2 = () => setIsUploadingModalOpen2(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);
  const openManageModal = () => setIsManageModalOpen(true);
  const closeManageModal = () => setIsManageModalOpen(false);

  const handleSignupSuccess = () => {
    setIsSignupModalOpen(false); // 회원가입 모달 닫기
    setIsLoginModalOpen(true); // 로그인 모달 열기
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              openUploadingModal={openUploadingModal}
              openUploadingModal2={openUploadingModal2}
              openLoginModal={openLoginModal}
              openSignupModal={openSignupModal}
            />
          }
        />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/archivedReport" element={<ArchivedReportPage />} />
        <Route path="/design" element={<DesignPage />} />

        <Route
          path="/myPage"
          element={
            <MyPage
              openLoginModal={openLoginModal}
              openSignupModal={openSignupModal}
              openManageModal={openManageModal}
            />
          }
        />
      </Routes>

      {/* 모달 렌더링 */}
      <ResumeUploadModal
        isOpen={isUploadingModalOpen}
        onClose={closeUploadingModal}
      />
      <ResumeUploadModal2
        isOpen={isUploadingModalOpen2}
        onClose={closeUploadingModal2}
      />
      <ResumeManageModal
        isOpen={isManageModalOpen}
        onClose={closeManageModal}
        onResumeSelected={() => {
          closeManageModal();
          closeUploadingModal();
        }}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSignupClick={() => {
          closeLoginModal();
          openSignupModal();
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        onSuccess={handleSignupSuccess}
      />
    </Router>
  );
}

export default App;
