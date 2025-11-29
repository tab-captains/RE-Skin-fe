import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const MOCK_PRODUCTS = {
  toner: [
    { 
      id: 1,
      name: "수분 스킨 토너",
      desc: "가볍고 산뜻한 제형으로 피부 깊숙이 수분을 공급해 촉촉함을 오래 유지해주는 토너입니다. 민감성 피부도 안심하고 사용할 수 있습니다.",
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
      desc: "칙칙한 피부를 환하게 밝혀주는 비타민C 세럼입니다. 꾸준히 사용하면 맑고 생기 있는 피부로 가꿔줍니다.",
      price: 27000,
      tags: ["톤업", "광채", "비타민C"]
    },
    { 
      id: 4,
      name: "히알루론 수분 에센스",
      desc: "히알루론산이 빠르게 스며들어 피부 깊숙이 수분을 채워주는 고보습 에센스입니다.",
      price: 24000,
      tags: ["수분", "보습", "탄력"]
    },
  ],

  moisturizer: [
    { 
      id: 5,
      name: "고보습 리페어 크림",
      desc: "극건성 피부를 위한 고보습 크림으로 피부 장벽을 탄탄하게 강화해줍니다.",
      price: 26000,
      tags: ["장벽강화", "고보습", "보습지속"]
    }
  ],

  emulsion: [
    { 
      id: 6,
      name: "산뜻 데일리 로션",
      desc: "가볍고 산뜻한 제형으로 매일 사용하기 좋은 데일리 로션입니다. 끈적임 없이 촉촉한 마무리감을 선사합니다.",
      price: 17000,
      tags: ["산뜻", "수분", "데일리"]
    }
  ],

  cleanser: [
    { 
      id: 7,
      name: "약산성 젤 클렌저",
      desc: "피부 자극을 최소화하는 약산성 포뮬러로 부드럽게 세정해주는 클렌저입니다.",
      price: 19000,
      tags: ["약산성", "순한세정", "민감성"]
    },
    { 
      id: 8,
      name: "딥클렌징 폼",
      desc: "모공 속 노폐물까지 깔끔하게 제거해주는 딥클렌징 폼입니다.",
      price: 16000,
      tags: ["딥클렌징", "모공관리", "뽀득함"]
    }
  ],

  lip_care: [
    { 
      id: 9,
      name: "시어버터 립밤",
      desc: "건조한 입술을 깊게 보습해주는 시어버터 립밤입니다. 은은한 윤기와 부드러운 발림성이 특징입니다.",
      price: 9000,
      tags: ["보습", "립케어", "부드러움"]
    },
    { 
      id: 10,
      name: "나이트 립 마스크",
      desc: "자는 동안 입술을 촉촉하게 유지해주는 고보습 립 마스크입니다.",
      price: 12000,
      tags: ["고보습", "각질케어", "나이트케어"]
    }
  ],

  eye_care: [
    { 
      id: 11,
      name: "탄력 아이크림",
      desc: "연약한 눈가 피부에 탄력을 채워주는 아이크림입니다. 주름개선 효과가 뛰어납니다.",
      price: 26000,
      tags: ["탄력", "주름개선", "안티에이징"]
    },
    { 
      id: 12,
      name: "수분 아이세럼",
      desc: "빠르게 흡수되는 가벼운 제형으로 눈가를 산뜻하게 케어하는 아이세럼입니다.",
      price: 22000,
      tags: ["수분", "가벼움", "부드러움"]
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
    { 
      id: 14,
      name: "티트리 진정 마스크팩",
      desc: "티트리 추출물로 트러블 피부 진정에 도움을 주는 마스크팩입니다.",
      price: 3000,
      tags: ["트러블", "진정", "피부정화"]
    }
  ],

  sun_care: [
    { 
      id: 15,
      name: "톤업 선크림 SPF50+",
      desc: "자연스러운 톤업 효과와 강력한 자외선 차단을 동시에 제공하는 선크림입니다.",
      price: 15000,
      tags: ["톤업", "UV차단", "백탁없음"]
    },
    { 
      id: 16,
      name: "수분 선젤 SPF50+",
      desc: "산뜻한 사용감의 젤 타입 선케어로 피부에 끈적임 없이 빠르게 흡수됩니다.",
      price: 16000,
      tags: ["산뜻", "수분", "데일리"]
    }
  ],

  other: [
    { 
      id: 17,
      name: "멀티밤 스틱",
      desc: "언제 어디서나 간편하게 보습을 더해주는 멀티 케어 스틱입니다.",
      price: 12000,
      tags: ["보습", "멀티케어", "휴대용"]
    }
  ],
};

const CategoryTitleMap = {
  toner: "스킨·토너",
  serum: "에센스·세럼",
  moisturizer: "크림",
  emulsion: "로션",
  cleanser: "클렌징",
  lip_care: "립케어",
  eye_care: "아이케어",
  mask_pack: "마스크팩",
  sun_care: "선케어",
  other: "기타"
};

const ProductCategoryPage = () => {
  const { category } = useParams();
  const key = category.toLowerCase();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(MOCK_PRODUCTS[key] || []);
  }, [category]);

  return (
    <Wrapper>
      <Title>{CategoryTitleMap[key]}</Title>

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
