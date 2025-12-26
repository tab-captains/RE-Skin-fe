import instance from "./axiosInstance";

export const getPostDetail = async (postId) => {
  try {
    if (!postId) {
      throw new Error("postId가 필요합니다.");
    }
    console.log("게시글 상세조회 요청 - postId:", postId);
    const res = await instance.get(`/api/posts/${postId}`);
    console.log("게시글 상세조회 응답:", res.data);
    return res.data; 
  } catch (err) {
    console.error("게시글 상세조회 API 오류:", err);
    console.error("에러 응답:", err.response?.data);
    console.error("에러 상태:", err.response?.status);
    console.error("요청 URL:", `/api/posts/${postId}`);
    throw err;
  }
};

/**
 * 게시글 목록 조회 (Pageable 기반)
 * @param {Object} options - 페이지네이션 옵션
 * @param {number} options.page - 페이지 번호 (0부터 시작, 기본값: 0)
 * @param {number} options.size - 페이지 크기 (기본값: 10)
 * @param {string} options.sort - 정렬 기준 (예: "publishedAt,desc", 기본값: "publishedAt,desc")
 * @param {string} options.type - 게시글 타입 (ARTICLE 또는 POST, 선택사항)
 * @param {number} options.authorId - 작성자 ID (내 글만 조회할 때 사용, 선택사항)
 * @returns {Promise} 게시글 목록 응답
 */
export const getPostList = async ({ 
  page = 0, 
  size = 10, 
  sort = "publishedAt,desc",
  type = null,
  authorId = null
} = {}) => {
  try {
    // URLSearchParams를 사용하여 쿼리 파라미터 생성
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    params.append('sort', sort); // 문자열로 직접 추가 (배열로 만들지 않음)
    
    if (type) {
      params.append('type', type);
    }
    
    if (authorId) {
      params.append('authorId', authorId.toString());
    }

    console.log("게시글 목록 조회 요청 URL:", `/api/posts?${params.toString()}`);
    const res = await instance.get(`/api/posts?${params.toString()}`);
    return res.data;
  } catch (err) {
    console.error("게시글 리스트 API 오류:", err);
    throw err;
  }
};

export const writePost = async (postData) => {
  try {
    console.log("게시글 작성 요청 데이터:", JSON.stringify(postData, null, 2));
    const res = await instance.post("/api/posts", postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error("게시글 등록 API 오류:", err);
    console.error("요청 데이터:", postData);
    console.error("에러 응답:", err.response?.data);
    throw err;
  }
};

export const updatePost = async (postId, postData) => {
  try {
    console.log("게시글 수정 요청 데이터:", JSON.stringify(postData, null, 2));
    const res = await instance.put(`/api/posts/${postId}`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error("게시글 수정 API 오류:", err);
    console.error("요청 데이터:", postData);
    console.error("에러 응답:", err.response?.data);
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

export const getTopViewedPosts = async () => {
  try {
    const res = await instance.get("/api/posts/top-viewed");
    return res.data;
  } catch (err) {
    console.error("조회수 TOP 3 조회 실패:", err);
    throw err;
  }
};
