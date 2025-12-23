import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosClose, IoIosSend } from 'react-icons/io'; 
// ★ 탐색기 확인 결과: 한 단계 위로 가서 common을 찾으면 됩니다.
import colors from '../common/colors'; 
import { createProduct } from '../../shared/api/products';

const PageContainer = styled.div`
    width: 100%;
    min-height: calc(100vh - 45px);
    background-color: #f8f9fa;
    padding: 80px 20px 40px;
    display: flex;
    justify-content: center;
`;

const FormBox = styled.div`
    width: 100%;
    max-width: 800px;
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 2px solid ${props => props.$themeColor || '#1F3058'};
    padding-bottom: 15px;
`;

const PageTitle = styled.h2`
    font-size: 1.5rem;
    color: ${props => props.$themeColor || '#1F3058'};
    margin: 0;
`;

const InputGroup = styled.div`
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledInput = styled.input`
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    &:focus { outline: none; border-color: #1F3058; }
`;

const StyledSelect = styled.select`
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
`;

const StyledTextarea = styled.textarea`
    padding: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    min-height: 300px;
    resize: vertical;
`;

const AdminProductPage = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        category: 'TONER',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handlePublish = async () => {
        if (!product.name || !product.description) {
            alert('상품명과 설명을 입력해주세요.');
            return;
        }
        try {
            const submitData = {
                productName: product.name,
                brandName: "Re:Skin",
                productType: product.category,
                price: 0,
                rating: 0,
                imageUrl: ""
            };

            console.log("서버로 보내는 데이터:", submitData);
            
            await createProduct(submitData);
            alert("제품이 등록되었습니다!");
            navigate('/');
        } catch (err) {
            console.error("API 에러 상세:", err.response?.data);
            alert("등록 실패! 필드명을 다시 확인하세요.");
        }
    };

    return (
        <PageContainer>
            <FormBox>
                <Header $themeColor={colors?.primary}>
                    <PageTitle $themeColor={colors?.primary}>신규 제품 등록</PageTitle>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>취소</button>
                        <button onClick={handlePublish} style={{ padding: '10px 20px', backgroundColor: colors?.primary || '#1F3058', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>등록하기</button>
                    </div>
                </Header>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                    <InputGroup>
                        <label style={{fontWeight: 'bold'}}>상품명</label>
                        <StyledInput name="name" placeholder="상품 이름" value={product.name} onChange={handleChange} />
                    </InputGroup>
                    <InputGroup>
                        <label style={{fontWeight: 'bold'}}>카테고리</label>
                        <StyledSelect name="category" value={product.category} onChange={handleChange}>
                            <option value="TONER">스킨/토너</option>
                            <option value="SERUM">에센스/세럼</option>
                            <option value="MOISTURIZER">크림</option>
                            <option value="CLEANSER">클렌징</option>
                        </StyledSelect>
                    </InputGroup>
                </div>

                <InputGroup>
                    <label style={{fontWeight: 'bold'}}>상세 설명</label>
                    <StyledTextarea name="description" placeholder="상세 내용 입력" value={product.description} onChange={handleChange} />
                </InputGroup>
            </FormBox>
        </PageContainer>
    );
};

export default AdminProductPage;