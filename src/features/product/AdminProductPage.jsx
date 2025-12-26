import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import colors from '../common/colors'; 
import { createProduct, getProductDetail, updateProduct } from '../../shared/api/products';

const AdminProductPage = () => {
    const navigate = useNavigate();
    const { productId } = useParams(); 
    const isEditMode = !!productId; 
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        productName: '',
        brandName: 'Re:Skin',
        productType: 'TONER',
        price: '',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const fetchDetail = async () => {
                try {
                    const res = await getProductDetail(productId);
                    const data = res.data?.data || res.data || res;
                    
                    setProduct({
                        productName: data.productName || '',
                        brandName: data.brandName || 'Re:Skin',
                        productType: data.productType || 'TONER',
                        price: data.price || '',
                        description: data.description || '',
                        imageUrl: data.imageUrl || ''
                    });
                } catch (err) {
                    console.error("상세 로딩 에러:", err);
                    alert("제품 정보를 불러오는데 실패했습니다.");
                    navigate(-1);
                }
            };
            fetchDetail();
        }
    }, [productId, isEditMode, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handlePublish = async () => {
        if (!product.productName) {
            alert('상품명을 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            const submitData = {
                productName: product.productName.trim(),
                brandName: product.brandName,
                productType: product.productType,
                price: Number(product.price) || 0,
                description: product.description, 
                rating: 0,
                imageUrl: product.imageUrl || ""
            };

            if (isEditMode) {
                await updateProduct(productId, submitData);
                alert("제품이 성공적으로 수정되었습니다!");
            } else {
                await createProduct(submitData);
                alert("제품이 성공적으로 등록되었습니다!");
            }
            navigate(`/product/${product.productType.toLowerCase()}`);
        } catch (err) {
            console.error("API 에러:", err.response?.data || err);
            alert(`처리 중 오류가 발생했습니다: ${err.response?.data?.message || "서버 에러"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <FormBox>
                <Header $themeColor={colors?.primary}>
                    <PageTitle $themeColor={colors?.primary}>
                        {isEditMode ? "제품 정보 수정" : "신규 제품 등록"}
                    </PageTitle>
                    <ButtonGroup>
                        <ActionButton onClick={() => navigate(-1)} disabled={loading}>취소</ActionButton>
                        <ActionButton $primary onClick={handlePublish} disabled={loading}>
                            {loading ? '처리 중...' : (isEditMode ? '수정하기' : '등록하기')}
                        </ActionButton>
                    </ButtonGroup>
                </Header>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                    <InputGroup>
                        <Label>상품명</Label>
                        <StyledInput 
                            name="productName" 
                            placeholder="상품 이름" 
                            value={product.productName} 
                            onChange={handleChange} 
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>가격 (원)</Label>
                        <StyledInput 
                            name="price" 
                            type="number" 
                            placeholder="0" 
                            value={product.price} 
                            onChange={handleChange} 
                        />
                    </InputGroup>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <InputGroup>
                        <Label>브랜드</Label>
                        <StyledInput 
                            name="brandName" 
                            placeholder="브랜드명" 
                            value={product.brandName} 
                            onChange={handleChange} 
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>카테고리</Label>
                        <StyledSelect 
                            name="productType" 
                            value={product.productType} 
                            onChange={handleChange}
                        >
                            <option value="TONER">스킨/토너</option>
                            <option value="SERUM">에센스/세럼</option>
                            <option value="MOISTURIZER">크림</option>
                            <option value="CLEANSER">클렌징</option>
                        </StyledSelect>
                    </InputGroup>
                </div>

                <InputGroup>
                    <Label>상세 설명</Label>
                    <StyledTextarea 
                        name="description" 
                        placeholder="제품 특징 및 성분 정보" 
                        value={product.description} 
                        onChange={handleChange} 
                    />
                </InputGroup>
            </FormBox>
        </PageContainer>
    );
};

export default AdminProductPage;

const PageContainer = styled.div`width: 100%; min-height: calc(100vh - 45px); background-color: #f8f9fa; padding: 80px 20px 40px; display: flex; justify-content: center;`;
const FormBox = styled.div`width: 100%; max-width: 800px; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);`;
const Header = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 2px solid ${props => props.$themeColor || '#1F3058'}; padding-bottom: 15px;`;
const PageTitle = styled.h2`font-size: 1.5rem; color: ${props => props.$themeColor || '#1F3058'}; margin: 0;`;
const InputGroup = styled.div`margin-bottom: 25px; display: flex; flex-direction: column; gap: 10px;`;
const Label = styled.label`font-weight: bold; color: #4b5563; font-size: 0.95rem;`;
const StyledInput = styled.input`padding: 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; transition: border-color 0.2s; &:focus { outline: none; border-color: #1F3058; }`;
const StyledSelect = styled.select`padding: 14px; border: 1px solid #ddd; border-radius: 8px; background-color: white; font-size: 1rem; cursor: pointer;`;
const StyledTextarea = styled.textarea`padding: 14px; border: 1px solid #ddd; border-radius: 8px; min-height: 200px; resize: vertical; font-size: 1rem; font-family: inherit; &:focus { outline: none; border-color: #1F3058; }`;
const ButtonGroup = styled.div`display: flex; gap: 12px;`;
const ActionButton = styled.button`padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; ${props => props.$primary ? `background-color: ${colors?.primary || '#1F3058'}; color: white; &:hover { opacity: 0.9; } &:disabled { background-color: #ccc; cursor: not-allowed; }` : `background-color: #e5e7eb; color: #4b5563; &:hover { background-color: #d1d5db; }`}`;