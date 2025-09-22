// hooks/useAuthValidation.ts
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { isTokenExpired } from '../api/tokenService';

export const useAuthValidation = () => {
  const { isLoggedIn, accessToken, logout } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      console.log('🔍 앱 시작 - 인증 상태 검증 시작');

      // 비로그인 상태면 즉시 완료
      if (!isLoggedIn) {
        console.log('✅ 비로그인 상태 - 검증 완료');
        setIsChecking(false);
        return;
      }

      try {
        // Case 1: localStorage에 로그인 상태가 있지만 토큰이 없는 경우
        if (isLoggedIn && !accessToken) {
          console.log('⚠️ 로그인 상태이지만 Access Token이 없음 → 로그아웃');
          logout();
          setIsChecking(false);
          return;
        }

        // Case 2: Access Token이 만료되었는지 확인
        if (accessToken && isTokenExpired(accessToken)) {
          console.log('⚠️ Access Token 만료됨 → 재로그인 필요');
          logout();
          setIsChecking(false);
          return;
        }

        // Case 3: 토큰이 유효하면 통과
        if (accessToken && !isTokenExpired(accessToken)) {
          console.log('✅ Access Token 유효 - 검증 완료');
          setIsChecking(false);
          return;
        }

        // 예상치 못한 경우
        console.log('❌ 예상치 못한 인증 상태 → 로그아웃');
        logout();

      } catch (error) {
        console.error('❌ 인증 검증 중 오류:', error);
        logout();
      } finally {
        setIsChecking(false);
      }
    };

    validateAuth();
  }, []);

  return { isChecking };
};
