import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import colors from '../../common/colors';
import { useNavigate } from 'react-router-dom';

const questions = [
  '세안 후 아무것도 바르지 않으면 건조하다',
  '일정 시간이 지나면, 얼굴, 특히 코와 이마가 번들거리며 기름진 편이다',
  '얼굴에 유분감이 있는 편이다',
  '평소에 속건조나 각질 때문에 피부가 푸석하게 느껴질 때가 있다',
  '특별히 덥지 않아도 홍조가 자주 올라오거나, 얼굴이 쉽게 빨개진다',
  '순한 제품이 아니면 얼굴에 쉽게 트러블이 난다(피부가 예민하다)',
];

const SkinTypeSurveyPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  const handleSubmit = () => {
    if (allAnswered) {
      // 설문 결과를 localStorage에 저장 (나중에 사용할 수 있도록)
      localStorage.setItem('skinTypeSurvey', JSON.stringify(answers));
      navigate('/upload');
    }
  };

  return (
    <PageWrapper>
      <Title>피부 타입 설문</Title>
      <Description>
        정확한 피부 분석을 위해 몇 가지 질문에 답변해주세요.
      </Description>

      <QuestionsContainer>
        {questions.map((question, index) => (
          <QuestionCard key={index}>
            <QuestionHeader>
              <QuestionNumber>{index + 1}</QuestionNumber>
              <QuestionText>{question}</QuestionText>
            </QuestionHeader>
            <AnswerButtons>
              <AnswerButton
                $selected={answers[index] === true}
                onClick={() => handleAnswer(index, true)}
              >
                그렇다
              </AnswerButton>
              <AnswerButton
                $selected={answers[index] === false}
                onClick={() => handleAnswer(index, false)}
              >
                아니다
              </AnswerButton>
            </AnswerButtons>
          </QuestionCard>
        ))}
      </QuestionsContainer>

      <SubmitButton
        onClick={handleSubmit}
        disabled={!allAnswered}
        $disabled={!allAnswered}
      >
        AI 피부분석하기
      </SubmitButton>
    </PageWrapper>
  );
};

export default SkinTypeSurveyPage;

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.primary};
  margin-bottom: 12px;
  text-align: center;
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: ${colors.primary};
  margin-bottom: 50px;
  text-align: center;
  line-height: 1.6;
`;

const QuestionsContainer = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 50px;
`;

const QuestionCard = styled.div`
  background: ${colors.background};
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const QuestionNumber = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background: ${colors.primary};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(31, 48, 88, 0.3);
`;

const QuestionText = styled.div`
  font-size: 1.15rem;
  color: ${colors.primary};
  line-height: 1.7;
  flex: 1;
  font-weight: 500;
`;

const AnswerButtons = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 4px;
`;

const AnswerButton = styled.button`
  flex: 1;
  padding: 14px 28px;
  border-radius: 12px;
  border: 2px solid ${({ $selected }) => ($selected ? colors.primary : colors.box)};
  background-color: ${({ $selected }) => ($selected ? colors.primary : colors.background)};
  color: ${({ $selected }) => ($selected ? 'white' : colors.primary)};
  font-size: 1.05rem;
  font-weight: ${({ $selected }) => ($selected ? '600' : '500')};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ $selected }) => ($selected ? '0 4px 12px rgba(31, 48, 88, 0.25)' : 'none')};

  &:hover {
    border-color: ${colors.primary};
    background-color: ${({ $selected }) => ($selected ? colors.primary : colors.box)};
    transform: translateY(-1px);
    box-shadow: ${({ $selected }) => ($selected ? '0 4px 12px rgba(31, 48, 88, 0.25)' : '0 2px 8px rgba(31, 48, 88, 0.15)')};
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubmitButton = styled.button`
  padding: 16px 48px;
  border-radius: 30px;
  background: ${({ $disabled }) => ($disabled ? '#ccc' : colors.primary)};
  color: white;
  border: none;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  box-shadow: ${({ $disabled }) => ($disabled ? 'none' : '0 4px 16px rgba(31, 48, 88, 0.3)')};

  &:hover {
    background: ${({ $disabled }) => ($disabled ? '#ccc' : colors.textAccent)};
    transform: ${({ $disabled }) => ($disabled ? 'none' : 'translateY(-2px)')};
    box-shadow: ${({ $disabled }) => ($disabled ? 'none' : '0 6px 20px rgba(31, 48, 88, 0.4)')};
  }

  &:active {
    transform: translateY(0);
  }
`;

