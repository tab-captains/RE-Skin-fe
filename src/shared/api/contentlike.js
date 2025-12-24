import instance from "./axiosInstance";

// 게시글 좋아요 등록
export const likePost = async (postId) => {
  try {
    if (!postId) {
      throw new Error("postId가 필요합니다.");
    }
    
    const token = localStorage.getItem("accessToken");
    console.log("좋아요 등록 요청:");
    console.log("  - postId:", postId);
    console.log("  - URL: /api/posts/" + postId + "/like");
    console.log("  - Method: POST");
    console.log("  - Has Token:", !!token);
    
    const res = await instance.post(`/api/posts/${postId}/like`);
    console.log("좋아요 등록 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("좋아요 등록 실패:");
    console.error("  - Status:", err.response?.status);
    console.error("  - Error Data:", err.response?.data);
    console.error("  - Error Message:", err.message);
    console.error("  - Request URL:", `/api/posts/${postId}/like`);
    
    // 500 에러는 백엔드 서버 내부 오류
    if (err.response?.status === 500) {
      console.error("백엔드 서버 내부 오류 (500) - 백엔드 로그를 확인해주세요.");
    }
    
    throw err;
  }
};

// 게시글 좋아요 취소
export const unlikePost = async (postId) => {
  try {
    if (!postId) {
      throw new Error("postId가 필요합니다.");
    }
    console.log("좋아요 취소 요청 - postId:", postId);
    const res = await instance.delete(`/api/posts/${postId}/like`);
    console.log("좋아요 취소 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("좋아요 취소 실패:", err);
    console.error("에러 응답:", err.response?.data);
    console.error("에러 상태:", err.response?.status);
    console.error("요청 URL:", `/api/posts/${postId}/like`);
    throw err;
  }
};
