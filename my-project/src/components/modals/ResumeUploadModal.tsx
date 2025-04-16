import Modal from "./Modal";
import { IMAGES } from "../../utils/constants";
import useAuthStore from "../../store/authStore";
import ResumeManageModal from "./ResumeManageModal";
import { useState } from "react";
import useResumeUpload from "../../hooks/useResumeUpload";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeUploadModal = ({ isOpen, onClose }: ResumeUploadModalProps) => {
  const { nickname } = useAuthStore();
  const [isResumeManageModalOpen, setIsResumeManageModalOpen] = useState(false);
  const [isResumeSelected, setIsResumeSelected] = useState(false);
  const { handleStartInterviewClick: startInterview } =
    useResumeUpload(onClose);

  const handleStartInterviewClick = () => {
    console.log("isResumeSelected", isResumeSelected);
    if (!isResumeSelected) return;
    startInterview();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        width="w-[500px]"
        height="h-auto"
      >
        <div className="text-center font-museo relative">
          <img
            src={IMAGES.Man}
            alt="Avatar"
            className="w-32 h-32 mx-auto mt-5 rounded-full border-gray-300 mb-4"
          />
          <p className="text-3xl font-semibold mb-2 mt-2">
            새로운 도전을 준비하는 <br /> {nickname}님, 반갑습니다 :)
          </p>
          <p className="text-gray-600 mb-4 mt-5 text-xl">
            맞춤형 면접 진행을 위해 <br />
            <span className="bg-gradient-to-b from-[#312594] via-[#4F41CE] to-[#8072F8] text-transparent bg-clip-text tracking-wide font-bold">
              이력서 등록
            </span>
            을 잊지 말아주세요.
          </p>

          {/* 이력서 선택하기 버튼 */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest text-white text-semibold px-6 py-3 transition cursor-pointer"
              onClick={() => setIsResumeManageModalOpen(true)}
            >
              이력서 선택하기
            </button>
          </div>

          {/* 면접 시작 버튼을 아래쪽에 배치 */}
          <div className="mt-4 mb-4">
            <button
              className={`rounded-md tracking-widest text-white text-semibold px-5 py-2 transition ${
                isResumeSelected
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={handleStartInterviewClick}
              // disabled={!isResumeSelected}
            >
              면접 시작
            </button>
          </div>
        </div>
      </Modal>

      <ResumeManageModal
        isOpen={isResumeManageModalOpen}
        onClose={() => setIsResumeManageModalOpen(false)}
        onResumeSelected={() => setIsResumeSelected(true)}
      />
    </>
  );
};

export default ResumeUploadModal;
