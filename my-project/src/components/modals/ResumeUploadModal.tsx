import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Man from "../../assets/Man.svg";
import { useNavigate } from "react-router-dom"; // 페이지 이동용

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  // userId: 1; // 유저 ID를 props로 받음
}

const ResumeUploadModal = ({ isOpen, onClose }: ResumeUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate(); // navigate 훅 사용

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
        onClose();
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
        console.log("서버 응답:", response.data.message); // 서버 응답 메시지 출력
        console.log("면접 ID:", response.data.interview_id);
        console.log("질문 개수:", response.data.questions_count);

        // 면접 페이지로 interviewId 전달 후 이동
        onClose();
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
        <div>
          {/* 파일 업로드 입력 */}
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* 파일 선택 버튼 */}
          <label
            htmlFor="fileInput"
            className="bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest mt-2 text-white text-semibold px-8 py-3 transition cursor-pointer"
          >
            파일 선택
          </label>

          {/* 업로드 버튼 */}
          <button
            className="bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest mt-2 text-white text-semibold px-8 py-3 transition"
            onClick={handleUploadResume}
            disabled={uploading}
          >
            {uploading ? "업로드 중..." : "이력서 업로드"}
          </button>
          <button
            className="bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest mt-2 text-white text-semibold px-8 py-3 transition"
            onClick={() => handleStartInterviewClick()} // 클릭 이벤트 핸들러
            disabled={uploading}
          >
            면접시작{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResumeUploadModal;
