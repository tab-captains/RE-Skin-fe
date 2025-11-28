import instance from "./axiosInstance";

export const getPostDetail = async (postId) => {
  try {
    const res = await instance.get(`/api/posts/${postId}`);
    return res.data; 
  } catch (err) {
    console.error("게시글 상세조회 API 오류:", err);
    throw err;
  }
};

export const getPostList = async () => {
  try {
    const res = await instance.get("/api/posts");
    return res.data;
  } catch (err) {
    console.error("게시글 리스트 API 오류:", err);
    throw err;
  }
};

export const writePost = async (postData) => {
  try {
    const res = await instance.post("/api/posts", postData);
    return res.data;
  } catch (err) {
    console.error("게시글 등록 API 오류:", err);
    throw err;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    const res = await instance.put(`/api/posts/${postId}`, postData);
    return res.data;
  } catch (err) {
    console.error("게시글 수정 API 오류:", err);
    throw err;
  }
};

export const deletePost = async (postId) => {
  try {
    const res = await instance.delete(`/api/posts/${postId}`);
    return res.data;
  } catch (err) {
    console.error("게시글 삭제 API 오류:", err);
    throw err;
  }
};
