// import "../../css/modal.css";
import Modal from "./Modal";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   // children: React.ReactNode;
// };
interface ResumeUploadModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 모달 닫기 핸들러
}

const ResumeUploadModal = ({ isOpen, onClose }: ResumeUploadModalProps) => {
  // 만약 isOpen이 false이면 null을 반환하여 모달을 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* 모달 콘텐츠 */}
      <div className="bg-white p-8 rounded w-96 text-center border-4 border-black">
        안녕하세요 캬캬캬 이력서 업로드 모달입니다.
      </div>{" "}
    </Modal>
  );
};

export default ResumeUploadModal;
