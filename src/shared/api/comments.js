import instance from "./axiosInstance";

// 댓글 등록
export const submitComment = async (postId, content) => {
  try {
    const res = await instance.post(`/api/posts/${postId}/comments`, {
      content: content,
    });
    return res.data;
  } catch (err) {
    console.error("댓글 등록 API 오류:", err);
    throw err;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const res = await instance.delete(`/api/comments/${commentId}`);
    return res.data;
  } catch (err) {
    console.error("댓글 삭제 API 오류:", err);
    throw err;
  }
};

// 특정 게시글 댓글 목록 조회
export const getComments = async (postId) => {
  try {
    const res = await instance.get(`/api/posts/${postId}/comments`);
    return res.data; 
  } catch (err) {
    console.error("댓글 목록 조회 API 오류:", err);
    throw err;
  }
};