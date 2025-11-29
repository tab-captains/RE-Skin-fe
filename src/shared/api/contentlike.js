import instance from "./axiosInstance";

// 게시글 좋아요 등록
export const likePost = async (postId) => {
  try {
    const res = await instance.post(`/api/posts/${postId}/like`);
    console.log("좋아요 등록 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("좋아요 등록 실패:", err);
    throw err;
  }
};

// 게시글 좋아요 취소
export const unlikePost = async (postId) => {
  try {
    const res = await instance.delete(`/api/posts/${postId}/like`);
    console.log("좋아요 취소 성공:", res.data);
    return res.data;
  } catch (err) {
    console.error("좋아요 취소 실패:", err);
    throw err;
  }
};
