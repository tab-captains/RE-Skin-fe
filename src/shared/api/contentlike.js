import instance from "./axiosInstance";

/**
 * 게시글 좋아요 토글 API
 * POST /api/posts/{postId}/like
 * 
 * @param {number|string} postId - 게시글 ID
 * @returns {Promise<Object>} 응답 데이터 { success, code, message, data: { postId, likeCount, liked } }
 */
export const togglePostLike = async (postId) => {
  try {
    if (!postId) {
      throw new Error("postId가 필요합니다.");
    }
    
    console.log("좋아요 토글 요청:");
    console.log("  - postId:", postId);
    console.log("  - URL: /api/posts/" + postId + "/like");
    console.log("  - Method: POST");
    
    const res = await instance.post(`/api/posts/${postId}/like`);
    console.log("좋아요 토글 성공:", res.data);
    
    // 응답 구조: { success, code, message, data: { postId, likeCount, liked } }
    return res.data;
  } catch (err) {
    console.error("좋아요 토글 실패:");
    console.error("  - Status:", err.response?.status);
    console.error("  - Error Data:", err.response?.data);
    console.error("  - Error Message:", err.message);
    console.error("  - Request URL:", `/api/posts/${postId}/like`);
    
    throw err;
  }
};

// 하위 호환성을 위한 별칭 (기존 코드에서 사용 중일 수 있음)
export const likePost = togglePostLike;
export const unlikePost = togglePostLike;
