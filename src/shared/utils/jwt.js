/**
 * JWT 토큰에서 payload 추출
 */
export const decodeJWT = (token) => {
  try {
    if (!token) return null;
    
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT 디코딩 실패:', error);
    return null;
  }
};

/**
 * JWT 토큰에서 userId 추출
 */
export const getUserIdFromToken = (token) => {
  const payload = decodeJWT(token);
  if (!payload) return null;
  
  // JWT의 sub 필드에 userId가 있을 수 있음
  // 또는 다른 필드명일 수도 있음 (userId, id, user_id 등)
  return payload.sub || payload.userId || payload.id || payload.user_id || null;
};

