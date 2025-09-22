// hooks/useAuthValidation.ts
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { isTokenExpired, refreshAccessToken } from '../api/tokenService';

export const useAuthValidation = () => {
  const { isLoggedIn, accessToken, refreshToken, logout } = useAuthStore();
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
          console.log('⚠️ Access Token 만료됨');
          
          if (refreshToken && !isTokenExpired(refreshToken)) {
            console.log('🔄 Refresh Token으로 갱신 시도');
            const newToken = await refreshAccessToken();
            
            if (newToken) {
              console.log('✅ 토큰 갱신 성공');
              setIsChecking(false);
              return;
            }
          }
          
          console.log('❌ 토큰 갱신 실패 → 로그아웃');
          logout();
          setIsChecking(false);
          return;
        }

        // Case 3: 토큰이 유효해 보이면 일단 통과 (빠른 UX)
        if (accessToken && !isTokenExpired(accessToken)) {
          console.log('✅ Access Token 유효 - 검증 완료');
          setIsChecking(false);
          
          // 백그라운드에서 서버 검증 (UI 블록하지 않음)
          setTimeout(async () => {
            try {
              const response = await fetch('http://localhost:8000/user/profile/', {
                method: 'GET',
                headers: { 
                  'Authorization': `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                }
              });

              if (!response.ok && response.status === 401) {
                console.log('❌ 백그라운드 검증: 서버에서 토큰 거부');
                // 자동 갱신 시도
                const newToken = await refreshAccessToken();
                if (!newToken) {
                  logout();
                }
              }
            } catch (error) {
              console.log('⚠️ 백그라운드 검증 실패 (네트워크 오류):', error);
              // 네트워크 오류는 무시 (오프라인 등)
            }
          }, 100); // 100ms 후 백그라운드 검증
          
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
  }, []); // 의존성 배열을 비워서 한 번만 실행

  return { isChecking };
};
