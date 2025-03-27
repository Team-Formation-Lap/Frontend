import axiosInstance from "./axiosInstance";

// interface EmailCheckRequest {
//   email: string;
// }

interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

interface ApiResponse {
  message?: string;
  nickname?: string;
  email?: string;
}

// 이메일 중복 확인 API
export const checkEmailExists = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post(`/users/exists`, {
      email,
    });

    if (response.status !== 200) {
      throw new Error("이메일 중복 확인 중 오류가 발생했습니다.");
    }

    const data = response.data;
    return data;
  } catch (error) {
    console.error("이메일 중복 확인 API 오류:", error);
    throw error;
  }
};

// 회원가입 API
export const registerUser = async (
  userData: SignupRequest
): Promise<ApiResponse> => {
  try {
    const response = await axiosInstance.post("/users/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      // 서버가 응답을 반환한 경우
      console.error("서버 응답 에러:", error.response.data);
      throw new Error(
        error.response.data.message || "회원가입 중 오류가 발생했습니다."
      );
    } else if (error.request) {
      // 요청이 전송되었으나 응답을 받지 못한 경우
      console.error("서버 응답 없음:", error.request);
      throw new Error("서버와의 통신에 실패했습니다.");
    } else {
      // 요청 설정 중 오류가 발생한 경우
      console.error("요청 설정 오류:", error.message);
      throw new Error("요청 설정 중 오류가 발생했습니다.");
    }
  }
};
