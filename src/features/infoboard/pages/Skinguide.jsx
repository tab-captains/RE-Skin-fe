import React from 'react';
import styled from 'styled-components';

const skincareSteps = [
  { step: 'STEP 1', title: '토너', english: 'Skin/ Toner', tip: '손바닥으로 톡톡 흡수시켜주세요' },
  { step: 'STEP 2', title: '앰플', english: 'Ampoule', tip: '고민 부위에 소량 도포하세요' },
  { step: 'STEP 3', title: '크림', english: 'Cream', tip: '얼굴 전체에 부드럽게 펴 바르세요' },
  { step: 'STEP 4', title: '로션', english: 'Lotion', tip: '가장 나중에 마무리로 발라주세요' },
];

const SkinguideContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px; 
  text-align: center;
`;

const SkinguideHeader = styled.div`
  h2 {
    font-size: 34px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #3d4a70;
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.7;
    margin-bottom: 90px; 
  }
`;

const StepNumber = styled.span`
  padding: 10px 22px;
  position: absolute;
  top: -50px; 
  border-radius: 999px;
  font-weight: 600;
  color: #fff;
  font-size: 15px;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.18);
  background-color: ${({ index }) => (index === 0 ? '#b9bdc8' : '#1e2a55')};
  z-index: 10;
`;

const CardsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 70px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    gap: 25px;
  }
`;

const StepCardGroup = styled.div`
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StepContentCard = styled.div`
  width: 100%;
  border: 1px solid #e3e6ed;
  border-radius: 18px;
  background-color: #fff;
  padding: 40px 20px 0 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.04);
  min-height: 260px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductTitle = styled.h3`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333;
`;

const ProductEnglish = styled.p`
  font-size: 14px;
  color: #9aa0a8;
  margin-bottom: 35px;
  font-style: normal;
`;

const TipBox = styled.div`
  margin-top: auto;
  width: 100%;
  background-color: #f3f5f8;
  padding: 12px 18px;
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 18px 18px;
  text-align: left;
`;

const TipText = styled.span`
  font-size: 14px;
  color: #555;

  strong {
    font-weight: 700;
    color: #333;
  }
`;

const Skinguide = () => {
  return (
    <SkinguideContainer>
      <SkinguideHeader>
        <h2>스킨케어 순서, 왜 중요한가요?</h2>
        <p>
          스킨케어는 순서대로 바르는 게 핵심이에요.
          <br />
          가벼운 제형 → 무거운 제형 순으로 흡수시켜야
          <br />
          영양성분이 피부에 효과적으로 전달됩니다.
        </p>
      </SkinguideHeader>

      <CardsRow>
        {skincareSteps.map((item, index) => (
          <StepCardGroup key={index}>
            <StepNumber index={index}>{item.step}</StepNumber>
            
            <StepContentCard>
              <ProductTitle>{item.title}</ProductTitle>
              <ProductEnglish>{item.english}</ProductEnglish>

              <TipBox>
                <TipText>
                  <strong>Tip:</strong> {item.tip}
                </TipText>
              </TipBox>
            </StepContentCard>
          </StepCardGroup>
        ))}
      </CardsRow>
    </SkinguideContainer>
  );
};

export default Skinguide;