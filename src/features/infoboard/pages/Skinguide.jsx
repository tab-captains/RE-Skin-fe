import React from 'react';
import './Skinguide.css'; // CSS 파일 임포트

// 🚨 스킨케어 단계별 데이터 정의
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

const Skinguide = () => {
    return (
        <div className="skinguide-container">
            
            {/* 1. 상단 타이틀 영역 */}
            <div className="skinguide-header">
                <h2>스킨케어 순서, 왜 중요한가요?</h2>
                <p>
                    스킨케어는 순서대로 바르는 게 핵심이에요.<br />
                    가벼운 제형 → 무거운 제형 순으로 흡수시켜야<br />
                    영양성분이 피부에 효과적으로 전달됩니다.
                </p>
            </div>
            
            {/* 2. 단계 카드 및 연결선 영역 */}
            <div className="steps-wrapper">
                {skincareSteps.map((item, index) => (
                    // 🚨 단계별 카드
                    <div key={index} className="step-card-group">
                        <div className="step-bar-area">
                            <span className="step-number">{item.step}</span>
                            {/* 마지막 단계(STEP 4)를 제외하고 연결선 렌더링 */}
                            {index < skincareSteps.length - 1 && (
                                <div className="step-line"></div>
                            )}
                        </div>
                        <div className="step-content-card">
                            <h3 className="product-title">{item.title}</h3>
                            <p className="product-english">{item.english}</p>
                            <div className="tip-box">
                                <span className="tip-text">Tip: {item.tip}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skinguide;