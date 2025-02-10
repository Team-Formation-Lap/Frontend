import "../../css/modal.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  // children: React.ReactNode;
};

const ResumeUploadModal = ({ isOpen, onClose }: Props) => {
  // 만약 isOpen이 false이면 null을 반환하여 모달을 렌더링하지 않음
  if (!isOpen) return null;

  return (
    // <div onClick={onClose} className="modal-overlay">
    <div onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <button onClick={onClose} className="modal-close"></button>
        {/* children */}
        <div>
          <p>이 항목을 삭제하시겠습니까?</p>
          <div>
            <button>삭제</button>
            <button onClick={onClose}>취소</button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default ResumeUploadModal;
