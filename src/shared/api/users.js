import instance from "./axiosInstance";

// 로그인한 사용자 정보 조회
export const getMyInfo = async () => {
  try {
    const response = await instance.get("/api/users/me"); 
    return response.data.data; 
  } catch (err) {
    console.error("사용자 정보 조회 API 오류:", err);
    throw err;
  }
};
