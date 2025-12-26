import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getCategories } from "../../shared/api/categories";
import { getAllProducts, deleteProduct } from "../../shared/api/products";

const ProductCategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const typeKey = category ? category.toUpperCase() : "";

  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const catRes = await getCategories();
      const categories = catRes.data?.data || catRes.data || catRes || [];
      const target = Array.isArray(categories) 
        ? categories.find((c) => c.slug === category.toLowerCase())
        : null;
      setCategoryName(target ? target.name : "제품 목록");

      const prodRes = await getAllProducts({ 
        page: 0, 
        size: 20, 
        types: typeKey 
      });

      const resData = prodRes.data?.data || prodRes.data || prodRes;
      
      if (resData && resData.content) {
        setProducts(resData.content);
      } else if (Array.isArray(resData)) {
        setProducts(resData);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchData();
    }
  }, [typeKey, category]);

  const handleDelete = async (e, productId) => {
    e.stopPropagation(); 
    if (window.confirm("정말로 이 제품을 삭제하시겠습니까?")) {
        try {
            await deleteProduct(productId);
            alert("삭제되었습니다.");
            fetchData(); 
        } catch (err) {
            alert("삭제 실패");
        }
    }
  };

  const handleEdit = (e, productId) => {
    e.stopPropagation();
    navigate(`/admin/product/edit/${productId}`); 
  };

  return (
    <Wrapper>
      <Title>{categoryName}</Title>
      {loading ? (
        <Message>제품 목록을 불러오는 중입니다...</Message>
      ) : products.length === 0 ? (
        <Message>현재 등록된 제품이 없습니다.</Message>
      ) : (
        <Grid>
          {products.map((item) => (
            <Card key={item.productId} onClick={() => navigate(`/product/detail/${item.productId}`)}>
              <Content>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Name>{item.productName}</Name>
                    <AdminButtons>
                        <span onClick={(e) => handleEdit(e, item.productId)}>수정</span>
                        <span onClick={(e) => handleDelete(e, item.productId)} className="del">삭제</span>
                    </AdminButtons>
                </div>
                <TagBox>
                  <Tag>#{item.brandName}</Tag>
                  <Tag>#{item.productType}</Tag>
                  {item.rating > 0 && <Tag $rating>★ {item.rating}</Tag>}
                </TagBox>

                <Price>{item.price > 0 ? `${item.price.toLocaleString()}원` : "가격 정보 없음"}</Price>
                <Button>자세히 보기</Button>
              </Content>
            </Card>
          ))}
        </Grid>
      )}
    </Wrapper>
  );
};

export default ProductCategoryPage;

const AdminButtons = styled.div`display: flex; gap: 10px; font-size: 13px; color: #94a3b8; cursor: pointer; span:hover { color: #1f3058; text-decoration: underline; } .del:hover { color: #ef4444; }`;
const Wrapper = styled.div`width: 100%; padding: 40px 20px; max-width: 1200px; margin: 0 auto;`;
const Title = styled.h2`font-size: 26px; font-weight: 700; margin-bottom: 24px; color: #1a1a1a;`;
const Message = styled.div`text-align: center; padding: 100px 0; color: #9ca3af; font-size: 1.1rem;`;
const Grid = styled.div`display: grid; grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 28px; @media (max-width: 600px) { grid-template-columns: 1fr; }`;
const Card = styled.div`background: #ffffff; border: 1px solid #e5e7eb; border-radius: 20px; padding: 26px 28px; display: flex; box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: all 0.2s ease-in-out; cursor: pointer; &:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.08); border-color: #3b82f6; }`;
const Content = styled.div`flex: 1;`;
const Name = styled.div`font-size: 20px; font-weight: 700; margin-bottom: 10px; color: #111827;`;
const TagBox = styled.div`display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;`;
const Tag = styled.span`background: ${props => props.$rating ? '#fffbeb' : '#f3f4f6'}; color: ${props => props.$rating ? '#b45309' : '#4b5563'}; padding: 4px 10px; font-size: 12px; border-radius: 6px; font-weight: 600;`;
const Description = styled.div`font-size: 14px; color: #6b7280; line-height: 1.6; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;`;
const Price = styled.div`font-size: 18px; font-weight: 800; margin-bottom: 18px; color: #111827;`;
const Button = styled.button`background: #1f3058; color: white; padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer; font-size: 14px; font-weight: 600; &:hover { background: #2c437a; }`;