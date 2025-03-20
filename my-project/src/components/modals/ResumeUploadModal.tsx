import Modal from "./Modal";
import { IMAGES } from "../../utils/constants";
import useResumeUpload from "../../hooks/useResumeUpload";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeUploadModal = ({ isOpen, onClose }: ResumeUploadModalProps) => {
  const {
    file,
    uploading,
    uploadCompleted,
    handleFileChange,
    handleUploadResume,
    handleStartInterviewClick,
  } = useResumeUpload(onClose);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center font-museo relative">
        <img
          src={IMAGES.Man}
          alt="Avatar"
          className="w-32 h-32 mx-auto mt-5 rounded-full border-gray-300 mb-4"
        />
        <p className="text-3xl font-semibold mb-2 mt-2">
          새로운 도전을 준비하는 <br /> 수여니님, 반갑습니다 :)
        </p>
        <p className="text-gray-600 mb-4 mt-5 text-xl">
          맞춤형 면접 진행을 위해 <br />
          <span className="bg-gradient-to-b from-[#312594] via-[#4F41CE] to-[#8072F8] text-transparent bg-clip-text tracking-wide font-bold">
            이력서 등록
          </span>
          을 잊지 말아주세요.
        </p>

        {/* 파일 선택 및 이력서 업로드 버튼을 같은 줄에 배치 */}
        <div className="flex justify-center gap-4 mt-4">
          {/* 파일 선택 버튼 */}
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest text-white text-semibold px-6 py-3 transition cursor-pointer"
          >
            {file ? file.name : "파일 선택"}
          </label>

          {/* 파일 업로드 입력 */}
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* 업로드 버튼 - 파일 선택 전까지 비활성화 */}
          <button
            className={`rounded-md tracking-widest text-white text-semibold px-6 py-3 transition ${
              !file
                ? "bg-gray-400 cursor-not-allowed"
                : uploading
                ? "bg-gray-400 cursor-not-allowed"
                : uploadCompleted
                ? "bg-green-600 hover:bg-green-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={handleUploadResume}
            disabled={!file || uploading || uploadCompleted}
          >
            {uploading
              ? "업로드 중..."
              : uploadCompleted
              ? "업로드 완료"
              : "이력서 업로드"}
          </button>
        </div>

        {/* 면접 시작 버튼을 아래쪽에 배치 */}
        <div className="mt-4 mb-4">
          <button
            className={`rounded-md tracking-widest text-white text-semibold px-5 py-2 transition ${
              uploadCompleted
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleStartInterviewClick}
            disabled={!uploadCompleted}
          >
            면접 시작
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResumeUploadModal;
