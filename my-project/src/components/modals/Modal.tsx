import React from "react";

// Modal 컴포넌트의 props 인터페이스 정의
interface ModalProps {
  isOpen: boolean; // 모달 열림 여부
  onClose: () => void; // 모달 닫기 핸들러
  children: React.ReactNode; // 모달 내부에 렌더링할 콘텐츠
}

// Modal 컴포넌트 정의
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  console.log("Modal 렌더링 상태:", isOpen); // 추가된 로그
  // 모달이 열리지 않은 경우(null 반환으로 렌더링하지 않음)
  if (!isOpen) {
    return null;
  }

  // 모달 배경 클릭 핸들러: 배경을 클릭하면 모달 닫기
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose(); // 배경 클릭 시 onClose 콜백 호출
    }
  };

  return (
    // 모달 배경 (회색 반투명 레이어)
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-[9999]"
      onClick={handleBackgroundClick} // 배경 클릭 핸들러 설정
    >
      {/* 모달 콘텐츠 */}
      <div
        className="bg-white p-8 rounded w-96 text-center"
        onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 중단 (배경 클릭과 구분)
      >
        {children} {/* 모달 내부에 렌더링될 콘텐츠 */}
      </div>
    </div>
  );

  //   return (
  //     <div
  //       style={{
  //         position: "fixed",
  //         top: "0",
  //         left: "0",
  //         width: "100vw",
  //         height: "100vh",
  //         backgroundColor: "rgba(0, 0, 0, 0.8)",
  //         zIndex: 9999,
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //       onClick={handleBackgroundClick}
  //     >
  //       <div
  //         style={{
  //           backgroundColor: "white",
  //           padding: "20px",
  //           border: "5px solid red", // 테두리 강조
  //           zIndex: 10000,
  //         }}
  //         onClick={(e) => e.stopPropagation()}
  //       >
  //         안녕하세요 이력서 업로드 모달입니다.
  //       </div>
  //     </div>
  //   );

  // return (
  //   <div
  //     className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
  //     onClick={handleBackgroundClick}
  //   >
  //     <div
  //       className="bg-white p-8 rounded-lg shadow-2xl border-4 border-red-500"
  //       onClick={(e) => e.stopPropagation()}
  //     >
  //       안녕하세요 이력서 업로드 모달입니다.
  //     </div>
  //   </div>
  // );
};

export default Modal;
