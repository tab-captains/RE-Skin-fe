import instance from "./axiosInstance";

// 카테고리 전체 목록 조회
export const getCategories = async () => {
  try {
    const response = await instance.get("/api/categories");
    return response.data.data;
  } catch (error) {
    console.error("카테고리 조회 실패:", error);
    throw error;
  }
};
