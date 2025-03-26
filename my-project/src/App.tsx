import "./App.css";
import "./index.css";
import StartPage from "./pages/StartPage";
import InterviewPage from "./pages/InterviewPage";
import ReportPage from "./pages/ReportPage";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeUploadModal from "./components/modals/ResumeUploadModal";
import LoginModal from "./components/modals/LoginModal";

function App() {
  const [isUploadingModalOpen, setIsUploadingModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openUploadingModal = () => setIsUploadingModalOpen(true);
  const closeUploadingModal = () => setIsUploadingModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <StartPage
              openUploadingModal={openUploadingModal} // 핸들러 전달
              openLoginModal={openLoginModal} // 핸들러 전달
            />
          }
        />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>

      {/* 모달 렌더링 */}
      <ResumeUploadModal
        isOpen={isUploadingModalOpen}
        onClose={closeUploadingModal}
      />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </Router>
  );
}
export default App;
