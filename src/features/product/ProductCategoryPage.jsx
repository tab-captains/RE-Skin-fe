import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getCategories } from "../../shared/api/categories";


const MOCK_PRODUCTS = {
  toner: [
    { 
      id: 1,
      name: "수분 스킨 토너",
      desc: "가볍고 산뜻한 제형으로 피부 깊숙이 수분을 공급해 촉촉함을 오래 유지해주는 토너입니다.",
      price: 15000,
      tags: ["수분", "진정", "민감성"]
    },
    { 
      id: 2,
      name: "저자극 토너",
      desc: "피부 자극을 최소화한 클린 처방으로 트러블 피부도 편안하게 사용할 수 있는 저자극 토너입니다.",
      price: 18000,
      tags: ["저자극", "진정", "트러블"]
    },
  ],
  serum: [
    { 
      id: 3,
      name: "비타민C 브라이트닝 세럼",
      desc: "칙칙한 피부를 환하게 밝혀주는 비타민C 세럼입니다.",
      price: 27000,
      tags: ["톤업", "광채", "비타민C"]
    },
    { 
      id: 4,
      name: "히알루론 수분 에센스",
      desc: "히알루론산이 피부 깊숙이 수분을 채워주는 고보습 에센스입니다.",
      price: 24000,
      tags: ["수분", "보습", "탄력"]
    },
  ],
  moisturizer: [
    { 
      id: 5,
      name: "고보습 리페어 크림",
      desc: "극건성 피부를 위한 고보습 크림입니다.",
      price: 26000,
      tags: ["장벽강화", "고보습", "보습지속"]
    }
  ],
  emulsion: [
    { 
      id: 6,
      name: "산뜻 데일리 로션",
      desc: "가볍고 산뜻한 제형으로 매일 사용하기 좋은 데일리 로션입니다.",
      price: 17000,
      tags: ["산뜻", "수분", "데일리"]
    }
  ],
  cleanser: [
    { 
      id: 7,
      name: "약산성 젤 클렌저",
      desc: "피부 자극을 최소화하는 약산성 포뮬라 클렌저입니다.",
      price: 19000,
      tags: ["약산성", "순한세정", "민감성"]
    },
    { 
      id: 8,
      name: "딥클렌징 폼",
      desc: "모공 속 노폐물까지 제거해주는 딥클렌징 폼입니다.",
      price: 16000,
      tags: ["딥클렌징", "모공관리", "뽀득함"]
    }
  ],
  lip_care: [
    { 
      id: 9,
      name: "시어버터 립밤",
      desc: "깊은 보습을 더해주는 시어버터 립밤입니다.",
      price: 9000,
      tags: ["보습", "립케어", "부드러움"]
    },
  ],
  eye_care: [
    { 
      id: 11,
      name: "탄력 아이크림",
      desc: "주름 개선과 탄력을 채워주는 아이크림입니다.",
      price: 26000,
      tags: ["탄력", "주름개선", "안티에이징"]
    }
  ],
  mask_pack: [
    { 
      id: 13,
      name: "수분충전 마스크팩",
      desc: "즉각적인 수분 공급을 도와주는 데일리 마스크팩입니다.",
      price: 3000,
      tags: ["수분", "진정", "데일리팩"]
    },
  ],
  sun_care: [
    { 
      id: 15,
      name: "톤업 선크림 SPF50+",
      desc: "자연스러운 톤업 효과의 선크림입니다.",
      price: 15000,
      tags: ["톤업", "UV차단", "백탁없음"]
    },
  ],
  other: [
    { 
      id: 17,
      name: "멀티밤 스틱",
      desc: "언제 어디서나 보습을 더해주는 멀티 케어 스틱입니다.",
      price: 12000,
      tags: ["보습", "멀티케어", "휴대용"]
    }
  ],
};

const ProductCategoryPage = () => {

  // URL slug (예: toner, serum...)
  const { category } = useParams();
  const key = category.toLowerCase();

  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState([]);

  // 카테고리 API 호출
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        console.log("API 응답 전체:", response);
        const categories = Array.isArray(response) ? response : response.data || [];
        console.log("정제된 카테고리 배열:", categories);
        const target = categories.find((c) => c.slug === key);

        setCategoryName(target ? target.name : "카테고리");

      } catch (error) {
        console.error("카테고리 로드 실패:", error);
      }
    };

    fetchCategories();
  }, [key]);

  // 제품 Mock 데이터 불러오기
  useEffect(() => {
    setProducts(MOCK_PRODUCTS[key] || []);
  }, [key]);

  return (
    <Wrapper>
      <Title>{categoryName}</Title>

      <Grid>
        {products.map((item) => (
          <Card key={item.id}>
            <Content>
              <Name>{item.name}</Name>

              <TagBox>
                {item.tags?.map((tag, idx) => (
                  <Tag key={idx}>#{tag}</Tag>
                ))}
              </TagBox>

              <Description>{item.desc}</Description>

              <Price>{item.price.toLocaleString()}원</Price>

              <Button>자세히 보기</Button>
            </Content>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default ProductCategoryPage;


// ====== Styled Components ======

const Wrapper = styled.div`
  width: 100%;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
  gap: 28px;
`;

const Card = styled.div`
  background: #ffffff;
  border: 2px solid #dfe3ec;
  border-radius: 20px;
  padding: 26px 28px;
  display: flex;
  box-shadow: 0 3px 12px rgba(0,0,0,0.05);
  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
`;

const Tag = styled.span`
  background: #eef2ff;
  color: #3c4c8e;
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 20px;
  border: 1px solid #d0d6f2;
  font-weight: 500;
`;

const Description = styled.div`
  font-size: 15px;
  color: #444;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const Price = styled.div`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 18px;
`;

const Button = styled.button`
  background: #22386d;
  color: white;
  padding: 12px 22px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    background: #2a4a8b;
  }
`;
