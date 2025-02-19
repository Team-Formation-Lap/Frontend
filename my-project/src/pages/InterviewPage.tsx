import { useEffect, useState } from "react";
import InterviewHeader from "../components/InterviewHeader";
import "../index.css";
import WebcamFeed from "../components/WebcamFeed";
import VirtualInterviewer from "../components/VirtualInterviewer";

const InterviewPage = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]); // 서버 메시지 저장

  useEffect(() => {
    // 웹소켓 서버 연결
    const ws = new WebSocket("ws://localhost:8000/ws/gpt/");

    ws.onopen = () => {
      console.log("웹소켓 연결 성공!");
      ws.send(JSON.stringify({ type: "init", message: "InterviewPage 접속" }));
    };

    ws.onmessage = (event) => {
      console.log("서버로부터 원본 메시지 수신:", event.data);

      try {
        const data = JSON.parse(event.data);

        // 🚀 유니코드 문자열을 정상적인 한글로 변환
        const decodedMessage = data.message.replace(
          /\\u([\dA-Fa-f]{4})/g,
          (_: string, group: string) => String.fromCharCode(parseInt(group, 16))
        );

        console.log("디코딩된 메시지:", decodedMessage);
        setMessages((prev) => [...prev, decodedMessage]);
      } catch (error) {
        console.error("JSON 파싱 또는 디코딩 오류:", error);
      }
    };

    ws.onclose = () => {
      console.log("웹소켓 연결 종료");
    };

    ws.onerror = (error) => {
      console.error("웹소켓 오류 발생:", error);
    };

    setSocket(ws); // 웹소켓을 상태로 저장

    return () => {
      ws.close(); // 페이지가 언마운트되면 웹소켓 종료
    };
  }, []);

  // 서버에 메시지 전송하는 함수
  const sendMessage = (msg: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "chat", message: msg }));
    } else {
      console.error("웹소켓이 연결되지 않았습니다.");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        {/* Virtual Interviewer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <VirtualInterviewer />
        </div>

        {/* Webcam Feed */}
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 9999,
          }}
        >
          <WebcamFeed />
        </div>

        {/* Interview Header */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <InterviewHeader />
        </div>

        {/* 웹소켓 메시지 표시 */}
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <h4>서버 메시지 로그</h4>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
          <button
            onClick={() => sendMessage("안녕하세요, 서버!")}
            style={{
              marginTop: "10px",
              padding: "5px 10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            서버에 메시지 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
