import React from 'react';
import styled from 'styled-components';

const skincareSteps = [
    {
        step: "STEP 1",
        title: "토너",
        english: "Skin/ Toner",
        tip: "손바닥으로 톡톡 흡수시켜주세요",
    },
    {
        step: "STEP 2",
        title: "앰플",
        english: "Ampoule",
        tip: "고민 부위에 소량 도포하세요",
    },
    {
        step: "STEP 3",
        title: "크림",
        english: "Cream",
        tip: "얼굴 전체에 부드럽게 펴 바르세요",
    },
    {
        step: "STEP 4",
        title: "로션",
        english: "Lotion",
        tip: "가장 나중에 마무리로 발라주세요",
    },
];

const SkinguideContainer = styled.div`
    /* .skinguide-container */
    max-width: 1200px;
    margin: 0 auto;
    padding: 60px 20px;
    text-align: center;
`;

const SkinguideHeader = styled.div`
    /* 기존 스타일 그대로 반영 */
    h2 {
        /* .skinguide-header h2 */
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #333;
    }

    p {
        /* .skinguide-header p */
        font-size: 16px;
        line-height: 1.5;
        color: #666;
        margin-bottom: 50px;
    }
`;

const StepsWrapper = styled.div`
    /* .steps-wrapper */
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    gap: 20px;
    
    /* @media (max-width: 900px) 반응형 스타일 적용 */
    @media (max-width: 900px) {
        flex-wrap: wrap;
    }
`;

const StepCardGroup = styled.div`
    /* .step-card-group */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    min-width: 200px;
    
    /* @media (max-width: 900px) 반응형 스타일 적용 */
    @media (max-width: 900px) {
        width: 45%;
        margin-bottom: 20px;
    }
`;

const StepBarArea = styled.div`
    /* .step-bar-area */
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

const StepNumber = styled.span`
    /* .step-number */
    background-color: #556c86;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    font-weight: 600;
    white-space: nowrap;
    z-index: 2;
`;

const StepLine = styled.div`
    /* .step-line */
    flex-grow: 1;
    height: 4px;
    background-color: #d1d8e0;
    margin: 0 -15px 0 15px;

    /* @media (max-width: 900px) 반응형 스타일 적용 */
    @media (max-width: 900px) {
        display: none;
    }
`;

const StepContentCard = styled.div`
    /* .step-content-card */
    width: 100%;
    border: 1px solid #d1d8e0;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 25px 15px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const ProductTitle = styled.h3`
    /* .product-title */
    font-size: 20px;
    font-weight: 700;
    color: #333;
    margin-bottom: 5px;
`;

const ProductEnglish = styled.p`
    /* .product-english */
    font-size: 14px;
    color: #999;
    margin-bottom: 30px;
`;

const TipBox = styled.div`
    /* .tip-box */
    margin-top: auto;
    padding: 10px;
    border-top: 1px solid #eee;
    
    background-color: #f8f9fa;
    border-radius: 0 0 10px 10px; 
    
    /* 팁 박스의 패딩과 너비를 계산하여 카드 영역을 꽉 채우는 로직 */
    margin-left: -15px;
    margin-right: -15px;
    width: calc(100% + 30px);
`;

const TipText = styled.span`
    /* .tip-box .tip-text */
    font-size: 13px;
    color: #556c86;
    font-weight: 500;
    margin-left: 10px;
    /* TipBox에서 text-align: left;를 적용했으므로 별도 조정 불필요 */
`;


const Skinguide = () => {
    return (
        <SkinguideContainer>
            <SkinguideHeader>
                <h2>스킨케어 순서, 왜 중요한가요?</h2>
                <p>
                    스킨케어는 순서대로 바르는 게 핵심이에요.<br />
                    가벼운 제형 → 무거운 제형 순으로 흡수시켜야<br />
                    영양성분이 피부에 효과적으로 전달됩니다.
                </p>
            </SkinguideHeader>
            <StepsWrapper>
                {skincareSteps.map((item, index) => (
                    <StepCardGroup key={index}>
                        <StepBarArea>
                            <StepNumber>{item.step}</StepNumber>
                            {index < skincareSteps.length - 1 && (
                                <StepLine />
                            )}
                        </StepBarArea>
                        <StepContentCard>
                            <ProductTitle>{item.title}</ProductTitle>
                            <ProductEnglish>{item.english}</ProductEnglish>
                            <TipBox>
                                <TipText>Tip: {item.tip}</TipText>
                            </TipBox>
                        </StepContentCard>
                    </StepCardGroup>
                ))}
            </StepsWrapper>
        </SkinguideContainer>
    );
};

export default Skinguide;