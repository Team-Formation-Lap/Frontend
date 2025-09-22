// utils/authUtils.ts
import useAuthStore from '../store/authStore';

// 로그아웃 처리
export const handleLogout = async () => {
  const { logout, refreshToken } = useAuthStore.getState();
  
  // 백엔드에 로그아웃 요청 (선택사항)
  if (refreshToken) {
    try {
      await fetch('http://localhost:8000/user/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
    } catch (error) {
      console.error('❌ 로그아웃 API 요청 실패:', error);
    }
  }
  
  // 로컬 상태 정리
  logout();
  
  // 페이지 새로고침 또는 리다이렉트
  window.location.href = '/';
};

// 인증이 필요한 페이지에서 사용할 가드 함수
export const requireAuth = () => {
  const { isLoggedIn, accessToken } = useAuthStore.getState();
  
  if (!isLoggedIn || !accessToken) {
    alert('로그인이 필요합니다.');
    return false;
  }
  
  return true;
};

// 사용자 정보 가져오기
export const getCurrentUser = () => {
  const { isLoggedIn, userId, nickname, email } = useAuthStore.getState();
  
  if (!isLoggedIn) {
    return null;
  }
  
  return {
    userId,
    nickname,
    email,
  };
};

// 토큰 정보 가져오기
export const getTokens = () => {
  const { accessToken, refreshToken } = useAuthStore.getState();
  
  return {
    accessToken,
    refreshToken,
  };
};
