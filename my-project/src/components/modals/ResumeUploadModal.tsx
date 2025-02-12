import Modal from "./Modal";
import Man from "../../assets/Man.svg";
import { useNavigate } from "react-router-dom"; // 페이지 이동용

interface ResumeUploadModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 모달 닫기 핸들러
}

const ResumeUploadModal = ({ isOpen, onClose }: ResumeUploadModalProps) => {
  // 만약 isOpen이 false이면 null을 반환하여 모달을 렌더링하지 않음
  // if (!isOpen) return null;

  const navigate = useNavigate(); // navigate 훅 사용
  const handleInterviewPageClick = () => {
    console.log("인터뷰페이지로 이동");
    onClose();
    navigate("/interview"); // state에 memberId 전달
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center font-museo relative">
        {/* 캐릭터 이미지 */}
        <img
          src={Man}
          alt="Avatar"
          className="w-32 h-32 mx-auto mt-5 rounded-full  border-gray-300 mb-4"
        />

        {/* 인사 문구 */}
        <p className="text-3xl font-semibold mb-2 mt-2">
          새로운 도전을 준비하는 <br /> 박수연님, 반갑습니다 :)
        </p>

        {/* 설명 문구 */}
        <p className="text-gray-600 mb-4 mt-5 text-xl">
          맞춤형 면접 진행을 위해 <br />
          <span className="bg-gradient-to-b from-[#312594] via-[#4F41CE] to-[#8072F8] text-transparent bg-clip-text tracking-wide font-bold">
            이력서 등록
          </span>
          을 잊지 말아주세요.
        </p>

        {/* 이력서 업로드 버튼 */}
        <button
          className="bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest mt-6 text-white text-semibold px-8 py-3  transition"
          onClick={() => handleInterviewPageClick()} // 클릭 이벤트 핸들러
        >
          이력서 업로드
        </button>
      </div>
    </Modal>
  );
};

export default ResumeUploadModal;
