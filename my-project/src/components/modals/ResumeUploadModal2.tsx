import Modal from "./Modal";
import { IMAGES } from "../../utils/constants";
import useAuthStore from "../../store/authStore";
import ResumeManageModal from "./ResumeManageModal";
import { useState } from "react";
import useResumeUpload from "../../hooks/useResumeUpload";

interface ResumeUploadModal2Props {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeUploadModal2 = ({ isOpen, onClose }: ResumeUploadModal2Props) => {
  const { nickname } = useAuthStore();
  const [isResumeManageModalOpen, setIsResumeManageModalOpen] = useState(false);
  const [isResumeSelected, setIsResumeSelected] = useState(false);
  const { handleStartInterviewClick: startInterview } =
    useResumeUpload(onClose);

  const handleStartInterviewClick = () => {
    console.log("isResumeSelected", isResumeSelected);
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
            등록된 이력서를 통해 <br />
            <span className="bg-gradient-to-b from-[#312594] via-[#4F41CE] to-[#8072F8] text-transparent bg-clip-text tracking-wide font-bold">
              면접
            </span>
            을 바로 시작해요.
          </p>

          {/* 버튼 섹션 */}
          <div className="flex flex-col items-center gap-3 mt-6">
            <button
              className="bg-[#6D5DFB] hover:bg-[#5c4ee0] rounded-md tracking-widest text-white font-semibold px-6 py-3 transition"
              onClick={handleStartInterviewClick}
            >
              면접 시작하기
            </button>

            {/* 이력서 변경 텍스트 링크 스타일 */}
            <p className="text-sm text-gray-500 font-semibold mt-2">
              지원서를 변경하시겠어요?{" "}
              <button
                className="text-[#6D5DFB] font-semibold hover:underline ml-1"
                onClick={() => {
                  setIsResumeManageModalOpen(true);
                  onClose();
                }}
              >
                지원서 변경
              </button>
            </p>
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

export default ResumeUploadModal2;
