import instance from "./axiosInstance";

export const createProduct = async (productData) => {
    try {
        // 서버 명세서에 price가 필수라면 임시로 0이라도 넣어줘야 합니다.
        const dataToSend = {
            ...productData,
            price: 0 // 서버가 가격 필드를 무조건 요구할 경우를 대비한 임시 값
        };
        
        const response = await instance.post("/api/products/admin", dataToSend);
        return response.data;
    } catch (error) {
        // 콘솔창(F12)에서 구체적인 에러 내용을 보기 위해 로그 추가
        console.error("API 상세 에러:", error.response?.data || error.message);
        throw error;
    }
};