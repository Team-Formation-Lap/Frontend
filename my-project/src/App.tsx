import "./App.css";
import "./index.css";
import StartPage from "./pages/StartPage";
import InterviewPage from "./pages/InterviewPage";
import ReportPage from "./pages/ReportPage";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeUploadModal from "./components/modals/ResumeUploadModal";
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignupModal";
import MyPage from "./pages/MyPage";

function App() {
  const [isUploadingModalOpen, setIsUploadingModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openUploadingModal = () => setIsUploadingModalOpen(true);
  const closeUploadingModal = () => setIsUploadingModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              openUploadingModal={openUploadingModal}
              openLoginModal={openLoginModal}
              openSignupModal={openSignupModal}
            />
          }
        />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route
          path="/myPage"
          element={
            <MyPage
              openUploadingModal={openUploadingModal}
              openLoginModal={openLoginModal}
              openSignupModal={openSignupModal}
            />
          }
        />
      </Routes>

      {/* 모달 렌더링 */}
      <ResumeUploadModal
        isOpen={isUploadingModalOpen}
        onClose={closeUploadingModal}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSignupClick={() => {
          closeLoginModal();
          openSignupModal();
        }}
      />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
    </Router>
  );
}
export default App;
