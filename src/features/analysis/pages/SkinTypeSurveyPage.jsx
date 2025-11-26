import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../common/colors';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/context/AuthContext";
import useReveal from "../../common/hooks/useReveal";


//api
import { submitSurvey } from "../../../shared/api/survey";

const questions = [
  '세안 후 아무 것도 바르지 않으면 건조하다',
  '평소에 속건조나 각질 때문에 피부가 푸석하게 느껴질 때가 있다',
  '얼굴에 유분감이 있는 편이다',
  '일정 시간이 지나면 얼굴, 특히 코와 이마가 번들거리며 기름진 편이다',
  '특별히 덥지 않아도 홍조가 자주 올라오거나, 얼굴이 쉽게 빨개진다',
  '순한 제품이 아니면 얼굴에 쉽게 트러블이 난다(피부가 예민하다)',
];

const SkinTypeSurveyPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({}); //answers 객체 설정.
  const { user } = useAuth();

  const handleAnswer = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const allAnswered = Object.keys(answers).length === questions.length;


//
  const handleSubmit = async () => {
    if(!allAnswered) return;

    const surveyData ={};
    Object.keys(answers).forEach((key)=>{
      surveyData[`q${Number(key)+1}`] = answers[key]
    });  //q${anwers의 key값+1}=answers의 value

    console.log("Sending surveyData:", surveyData);
    console.log("Token:", localStorage.getItem("token"));
    try{
      const response = await submitSurvey(surveyData);
      console.log("설문 제출 성공: ",response);

      navigate("/upload");
    }catch(error){
      console.error('설문 제출 실패:', error);
    }
  };
//



  const { ref: topRef, isRevealed: topReveal } = useReveal();

  return (
    <PageWrapper>
      <TopSection ref={topRef} $revealed={topReveal}>
        <Title>피부 타입 진단 테스트</Title>
        <Description>
          정확한 피부 분석을 위해 먼저 <b>{user ? user.username : "Guest"}</b>님의 피부 타입을 확인할게요!<br />
          선택된 답변을 기반으로 피부 타입이 결정됩니다.
        </Description>
      </TopSection>

      <QuestionsContainer>
        {questions.map((question, index) => {
          const { ref, isRevealed } = useReveal();

          return (
            <QuestionCard ref={ref} key={index} $revealed={isRevealed}>
              <QuestionHeader>
                <QuestionNumber>{index + 1}</QuestionNumber>
                <QuestionText>{question}</QuestionText>
              </QuestionHeader>
              <AnswerButtons>
                <AnswerButton
                  $selected={answers[index] === true}
                  onClick={() => handleAnswer(index, true)}  //그렇다=true.
                >
                  그렇다
                </AnswerButton>

                <AnswerButton
                  $selected={answers[index] === false}
                  onClick={() => handleAnswer(index, false)} //아니다 = false.
                >
                  아니다
                </AnswerButton>
              </AnswerButtons>
            </QuestionCard>
          );
        })}
      </QuestionsContainer>

      <SubmitWrapper $show={allAnswered}>
        <SubmitButton onClick={handleSubmit}>
          AI 피부분석하기
        </SubmitButton>
      </SubmitWrapper>
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

const TopSection = styled.div`
  opacity: 0;
  transform: translateY(30px);
  transition: 1s ease;

  ${({ $revealed }) =>
    $revealed &&
    `
      opacity: 1;
      transform: translateY(0);
    `}
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
  opacity: 0;
  transform: translateY(40px);
  transition: 1s ease;

  ${({ $revealed }) =>
    $revealed &&
    `
      opacity: 1;
      transform: translateY(0);
    `}
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const QuestionNumber = styled.div`
  font-size: 1rem;
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
`;

const QuestionText = styled.div`
  font-size: 1rem;
  color: ${colors.primary};
  line-height: 1.7;
  flex: 1;
  font-weight: 700;
  margin-top: 4px;
`;

const AnswerButtons = styled.div`
  display: flex;
  gap: 14px;
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

  &:hover {
    border-color: ${({ $selected}) => ($selected ? colors.primary: 'rgba(0,0,0,0.1)')};
    background-color: ${({ $selected }) => ($selected ? colors.primary : colors.box)};
    transform: translateY(-1px);
    box-shadow: ${({ $selected }) => ($selected ? '0 4px 12px rgba(31, 48, 88, 0.25)' : '0 2px 8px rgba(31, 48, 88, 0.15)')};
  }
`;

const SubmitWrapper = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: 0.5s ease;

  ${({ $show }) =>
    $show &&
    `
      opacity: 1;
      transform: translateY(0);
    `}
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 14px 47px;
  border-radius: 30px;
  background: ${colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
 box-shadow: 0 6px 16px ${colors.primary}50;
  transition: 0.3s ease;

  &:hover {
    background: ${colors.primary}EE;
    transform: translateY(-2px);
  }
`;


