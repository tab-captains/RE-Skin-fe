import instance from "./axiosInstance";

// 전체 제품 목록 조회
export const getAllProducts = async (params) => {
    try {
        const response = await instance.get("/api/products", { params });
        return response.data; 
    } catch (error) {
        console.error("제품 목록 조회 에러:", error.response?.data || error.message);
        throw error;
    }
};

// 제품 상세 조회
export const getProductDetail = async (productId) => {
    try {
        const response = await instance.get(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("제품 상세 조회 에러:", error.response?.data || error.message);
        throw error;
    }
};

// 제품 등록
export const createProduct = async (productData) => {
    try {
        const response = await instance.post("/api/products/admin", productData);
        return response.data;
    } catch (error) {
        console.error("제품 등록 에러:", error.response?.data || error.message);
        throw error;
    }
};

// 제품 수정
export const updateProduct = async (productId, productData) => {
    try {
        const response = await instance.put(`/api/products/admin/${productId}`, productData);
        return response.data;
    } catch (error) {
        console.error("제품 수정 에러:", error.response?.data || error.message);
        throw error;
    }
};

// 제품 삭제
export const deleteProduct = async (productId) => {
    try {
        const response = await instance.delete(`/api/products/admin/${productId}`);
        return response.data;
    } catch (error) {
        console.error("제품 삭제 에러:", error.response?.data || error.message);
        throw error;
    }
};