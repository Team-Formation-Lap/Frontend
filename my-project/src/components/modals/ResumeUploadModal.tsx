import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Man from "../../assets/Man.svg";
import { useNavigate } from "react-router-dom"; // 페이지 이동용

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeUploadModal = ({ isOpen, onClose }: ResumeUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false); // 업로드 완료 여부
  const navigate = useNavigate();

  // 파일 선택 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadResume = async () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/resumes/upload/1`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("이력서가 성공적으로 업로드되었습니다!");
        setUploadCompleted(true); // 업로드 완료 상태 변경
      } else {
        alert("업로드 실패! 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
  };

  const handleStartInterviewClick = async () => {
    if (!uploadCompleted) return; // 업로드 완료되지 않으면 실행 안 됨

    console.log("면접페이지로 이동");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/apps/start",
        {
          user_id: 1,
          question_count: 3,
        }
      );

      if (response.status === 201 && response.data?.interview_id) {
        const interviewId = response.data.interview_id;
        console.log("서버 응답:", response.data.message);
        console.log("면접 ID:", response.data.interview_id);
        console.log("질문 개수:", response.data.questions_count);

        onClose(); // 면접 시작 시에만 모달 닫기
        navigate("/interview", { state: { interviewId } });
      } else {
        console.error("❌ 면접 시작 실패! 응답 값 없음:", response);
      }
    } catch (error) {
      console.error("❌ 면접 시작 API 오류:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center font-museo relative">
        <img
          src={Man}
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
