import instance from "./axiosInstance";

export const getCategories = async () => {
  try {
    const response = await instance.get("/api/categories");
    
    console.log("서버에서 온 데이터:", response.data);
    const result = response.data?.data || (Array.isArray(response.data) ? response.data : []);
    
    return result;
  } catch (error) {
    console.error("카테고리 조회 실패:", error);
    return [];
  }
};