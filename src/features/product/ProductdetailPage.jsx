import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getProductDetail, deleteProduct } from '../../shared/api/products';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getProductDetail(productId);
                setProduct(res.data || res);
            } catch (err) {
                console.error("상세 정보 로딩 실패:", err);
                alert("제품 정보를 불러올 수 없습니다.");
                navigate(-1);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [productId, navigate]);

    const handleDelete = async () => {
        if (window.confirm("정말로 이 제품을 삭제하시겠습니까?")) {
            try {
                await deleteProduct(productId);
                alert("삭제되었습니다.");
                navigate(-1);
            } catch (err) {
                alert("삭제에 실패했습니다.");
            }
        }
    };

    if (loading) return <Message>제품 정보를 불러오는 중입니다...</Message>;
    if (!product) return <Message>제품 정보가 없습니다.</Message>;

    return (
        <PageContainer>
            <DetailBox>
                <Header>
                    <BackButton onClick={() => navigate(-1)}>← 목록으로</BackButton>
                    <AdminGroup>
                        <AdminButton onClick={() => navigate(`/admin/product/edit/${productId}`)}>수정</AdminButton>
                        <AdminButton $del onClick={handleDelete}>삭제</AdminButton>
                    </AdminGroup>
                </Header>

                <InfoSection>
                    <BrandName>{product.brandName}</BrandName>
                    <ProductName>{product.productName}</ProductName>
                    
                    <TagBox>
                        <Tag>#{product.productType || 'SKINCARE'}</Tag>
                    </TagBox>

                    <PriceRow>
                        <PriceLabel>판매가</PriceLabel>
                        <PriceValue>{product.price?.toLocaleString()}원</PriceValue>
                    </PriceRow>

                    <Divider />

                    <DescriptionSection>
                        <Label>제품 설명</Label>
                        <DescriptionText>
                            {product.description && product.description !== "" 
                                ? product.description 
                                : "등록된 상세 설명이 없습니다."}
                        </DescriptionText>
                    </DescriptionSection>
                </InfoSection>
            </DetailBox>
        </PageContainer>
    );
};

export default ProductDetailPage;

const PageContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 100px 20px 60px;
    display: flex;
    justify-content: center;
`;

const DetailBox = styled.div`
    width: 100%;
    max-width: 700px; /* 이미지 없이 텍스트만 있으므로 가로폭을 줄여 집중도를 높임 */
    background: white;
    border-radius: 20px;
    padding: 50px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
`;

const BackButton = styled.button`
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 15px;
    &:hover { color: #1f3058; }
`;

const AdminGroup = styled.div`display: flex; gap: 15px;`;
const AdminButton = styled.button`
    background: none;
    border: none;
    font-size: 14px;
    color: ${props => props.$del ? '#ef4444' : '#94a3b8'};
    cursor: pointer;
    &:hover { text-decoration: underline; }
`;

const InfoSection = styled.div`
    display: flex; 
    flex-direction: column;
`;

const BrandName = styled.div`
    font-size: 18px; 
    color: #3b82f6; 
    font-weight: 600; 
    margin-bottom: 10px;
`;

const ProductName = styled.h1`
    font-size: 36px; 
    font-weight: 800; 
    color: #111827; 
    margin-bottom: 20px;
`;

const TagBox = styled.div`
    display: flex; 
    gap: 8px; 
    margin-bottom: 30px;
`;

const Tag = styled.span`
    background: #f3f4f6;
    color: #4b5563;
    padding: 6px 14px;
    font-size: 14px;
    border-radius: 20px;
    font-weight: 600;
`;

const PriceRow = styled.div`
    display: flex; 
    align-items: baseline; 
    gap: 15px; 
    margin-bottom: 20px;
`;

const PriceLabel = styled.span`
    color: #6b7280; 
    font-size: 18px;
`;

const PriceValue = styled.span`
    font-size: 32px; 
    font-weight: 800; 
    color: #111827;
`;

const Divider = styled.div`
    height: 1px; 
    background: #e5e7eb; 
    margin: 40px 0;
`;

const Label = styled.div`
    font-size: 18px; 
    font-weight: 700; 
    color: #374151; 
    margin-bottom: 20px;
`;

const DescriptionSection = styled.div`
    padding: 10px 0; 
    margin-bottom: 40px;
`;

const DescriptionText = styled.div`
    font-size: 16px; 
    color: #4b5563; 
    line-height: 1.8;
    white-space: pre-wrap;
`;

const Message = styled.div`
    text-align: center; 
    padding: 100px; 
    font-size: 18px; 
    color: #9ca3af;
`;