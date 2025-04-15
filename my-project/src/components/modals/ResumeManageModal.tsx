import { useEffect, useState } from "react";
import Modal from "./Modal";
import useResumeUpload from "../../hooks/useResumeUpload";
import useAuthStore from "../../store/authStore";
import axiosInstance from "../../api/axiosInstance";

interface ResumeManageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Resume {
  resume_id: number;
  filename: string;
}

const ResumeManageModal = ({ isOpen, onClose }: ResumeManageModalProps) => {
  const { nickname } = useAuthStore();
  const {
    file,
    uploading,
    uploadCompleted,
    handleFileChange,
    handleUploadResume: originalHandleUploadResume,
    resetUploadState,
  } = useResumeUpload(onClose);

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchResumes = async () => {
    try {
      const response = await axiosInstance.get("/resumes/list/");
      setResumes(response.data.resumes);
    } catch (error) {
      console.error("이력서 목록 조회 실패:", error);
    }
  };

  const handleUploadResume = async () => {
    await originalHandleUploadResume();
    await fetchResumes(); // ✅ 업로드 후 리스트 새로고침
    resetUploadState(); // ✅ 상태 초기화!
  };

  const handleDelete = async (resumeId: number) => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    try {
      setDeletingId(resumeId);
      await axiosInstance.delete(`/resumes/delete/${resumeId}`);
      await fetchResumes();
    } catch (error) {
      console.error("이력서 삭제 실패:", error);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (isOpen) fetchResumes();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="w-[700px]" height="h-auto">
      <div className="text-center font-museo relative px-6 py-4">
        <p className="text-2xl font-semibold mb-4 mt-2 text-indigo-700">
          {nickname}님의 이력서
        </p>

        {/* 이력서 리스트 테이블 */}
        <div className="border rounded-md max-h-[320px] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="sticky top-0 bg-gray-100 text-gray-500 text-base">
              <tr>
                <th scope="col" className="px-6 py-3 w-16 text-center">
                  NO
                </th>
                <th scope="col" className="px-6 py-3">
                  이력서 제목
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume, index) => (
                <tr key={resume.resume_id} className="border-t">
                  <td className="px-6 py-3 text-center">{index + 1}</td>
                  <td className="px-6 py-3">{resume.filename}</td>
                  <td className="px-6 py-3 text-center">
                    <button
                      className={`text-red-500 border border-red-400 rounded-md px-2 py-1 text-sm hover:bg-red-50 ${
                        deletingId === resume.resume_id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={deletingId === resume.resume_id}
                      onClick={() => handleDelete(resume.resume_id)}
                    >
                      {deletingId === resume.resume_id ? "삭제 중..." : "삭제"}
                    </button>
                  </td>
                </tr>
              ))}
              {resumes.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-gray-400 py-6">
                    등록된 이력서가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 파일 선택 및 업로드 */}
        <div className="flex justify-center gap-4 mt-6 mb-2">
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="bg-indigo-600 rounded-md hover:bg-indigo-700 tracking-widest text-white font-semibold px-6 py-3 transition cursor-pointer"
          >
            {file ? file.name : "파일 선택"}
          </label>

          <button
            className={`rounded-md tracking-widest text-white font-semibold px-6 py-3 transition ${
              !file || uploading
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
      </div>
    </Modal>
  );
};

export default ResumeManageModal;
