// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const VirtualInterviewer = () => {
//   const [videoUrl, setVideoUrl] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const generateVideo = async () => {
//     setLoading(true);
//     try {
//       const apiKey = import.meta.env.VITE_DID_API_KEY;

//       if (!apiKey) {
//         throw new Error("API Key가 설정되지 않았습니다.");
//       }

//       const response = await axios.post(
//         "/api/talks",
//         {
//           source_url: "http://localhost:5173/interviewer.png",
//           script: {
//             type: "text",
//             subtitles: "false",
//             provider: "microsoft",
//             // voice_id: "en-GB-AbbiNeural",

//             ssml: "false",
//             text: "안녕하세요, 자기소개를 부탁드립니다.",
//           },
//           config: {
//             fluent: true,
//             pad_audio: 0.5,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${apiKey}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setVideoUrl(response.data.result_url);
//     } catch (error: unknown) {
//       console.error("영상 생성 실패:", error);

//       if (axios.isAxiosError(error)) {
//         console.error("응답 오류:", error.response?.data);
//       } else if (error instanceof Error) {
//         console.error("일반 오류:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ 페이지 접속 시 자동으로 영상 생성
//   useEffect(() => {
//     generateVideo();
//   }, []);

//   return (
//     <div className="p-4">
//       {loading && <p>영상 생성 중...</p>}

//       {videoUrl && (
//         <video controls autoPlay className="mt-4 rounded shadow-md">
//           <source src={videoUrl} type="video/mp4" />
//         </video>
//       )}
//     </div>
//   );
// };

// export default VirtualInterviewer;
