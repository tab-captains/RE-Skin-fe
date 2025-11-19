import React from 'react';
import styled from 'styled-components';

const productTerms = [
  { 
    name: '토너', 
    english: 'Toner', 
    description: [
      '세안 후 피부결 정돈 및 약산성 밸런스 회복을 돕는 첫 단계 제품입니다.',
      '다음 단계 제품의 흡수를 돕는 부스팅 역할을 하기도 합니다.',
      '가벼운 물 제형부터 점성이 있는 에센스 제형까지 다양합니다.'
    ] 
  },
  { 
    name: '앰플', 
    english: 'Ampoule', 
    description: [
      '특정 피부 고민(탄력, 미백, 보습 등)을 집중적으로 해결하기 위한 고농축 기능성 제품입니다.',
      '세럼보다 유효 성분의 농도가 더 높습니다.',
      '소량만 사용하며, 고민 부위에 집중적으로 사용하기도 합니다.'
    ] 
  },
  { 
    name: '크림', 
    english: 'Cream', 
    description: [
      '기초 스킨케어의 마지막 단계에 사용하며, 영양 공급과 수분 증발을 막는 보호막 역할을 합니다.',
      '유분 함량이 높아 보습력이 뛰어나 건성 피부에 특히 중요합니다.',
      '밤 타입, 젤 타입 등 제형이 다양합니다.'
    ] 
  },
  { 
    name: '로션', 
    english: 'Lotion', 
    description: [
      '크림보다 유분 함량이 적고 수분 함량이 높아 산뜻하게 마무리됩니다.',
      '피부 표면에 가벼운 보습막을 형성하여 수분과 유분의 균형을 맞춥니다.',
      '지성 피부나 여름철에 사용하기 적합합니다.'
    ] 
  },
];

const DictionaryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 100px;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
`;

const DictionaryHeader = styled.div`
  margin-bottom: 70px;
  
  h1 {
    font-size: 34px;
    font-weight: 700;
    color: #1e2a55;
    margin-bottom: 12px;
  }

  p {
    font-size: 16px;
    color: #666;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 30px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr; 
  }
`;

const ProductCard = styled.div`
  background-color: #f7f9fc;
  border-radius: 18px;
  padding: 30px;
  text-align: left;
  min-height: 250px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
`;

const ImagePlaceholder = styled.div`
  width: 70px;
  height: 70px;
  background-color: #e0e5ee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
  color: #aeb4c0;
`;

const ProductTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1e2a55;
  margin-bottom: 5px;
`;

const ProductEnglish = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #3d4a70;
  margin-bottom: 15px;
`;

const DescriptionList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin: 0;
  
  li {
    font-size: 14px;
    line-height: 1.8;
    color: #555;
    margin-bottom: 5px;
  }
`;

const Dictionary = () => {
  return (
    <DictionaryContainer>
      <DictionaryHeader>
        <h1>스킨케어 용어 / 제품 알아보기</h1>
        <p>헷갈리는 화장품 용어를 한눈에 정리했어요</p>
      </DictionaryHeader>

      <CardGrid>
        {productTerms.map((item, index) => (
          <ProductCard key={index}>
            <ImagePlaceholder>
              <span style={{ color: '#888' }}>[Image]</span>
            </ImagePlaceholder>
            
            <ProductTitle>{item.name}</ProductTitle>
            <ProductEnglish>{item.english}</ProductEnglish>
            
            <DescriptionList>
              {item.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </DescriptionList>
          </ProductCard>
        ))}
      </CardGrid>
    </DictionaryContainer>
  );
};

export default Dictionary;