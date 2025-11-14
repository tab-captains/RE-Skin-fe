import styled from "styled-components";
import React from "react";
import {useNavigate} from "react-router-dom";
import colors from "../../common/colors";
import skinTypeIcon from '../../../assets/images/skinTypeIcon.png';
const MainPage=()=>{
  console.log("MainPage 렌더링"); 
  const navigate = useNavigate();

  return(
    <Container>
      <LeftSection>
        <Title>당신의 피부, <br></br>지금 어떤 상태인가요?</Title>
        <Description>Skin Type Analyzer로 AI가 분석한 당신의 피부 타입과 맞춤 관리 팁을 확인하세요.
           분석한 기록은 자동으로 저장되어 추적 관리가 가능합니다.</Description>
        <AnalyzeButton onClick={() => navigate("/login")}>피부 분석하기 -&gt;</AnalyzeButton>
      </LeftSection>
      <RightSection>
        <BoxSectionTop>
        <Icon src={skinTypeIcon} alt="../../../assets/images/skinTypeIcon.png"></Icon>
        <RecentAnalysis>
          <p style={{fontSize: '10px', height: '11px', margin: '3px', color: "gray"}}>최근 분석</p>
          <p style={{fontSize: '17px', height: 'auto',margin: '3px', fontWeight: "bold" , color: colors.primary}}>민감성</p> 
        </RecentAnalysis> 
        </BoxSectionTop>
        <BoxSectionBot>
          <Detail>
            <Symptom>여드름</Symptom>
            <ResultPreview>관리 필요</ResultPreview>
          </Detail>
          <Detail>
            <Symptom>모공</Symptom>
            <ResultPreview>적음</ResultPreview>
          </Detail>
          <Detail>
            <Symptom>주름</Symptom>
            <ResultPreview>관리 필요</ResultPreview>
          </Detail>
          <Detail>
            <Symptom>입술건조</Symptom>
            <ResultPreview>관리 필요</ResultPreview>
          </Detail>
        </BoxSectionBot>
        <FooterWrapper>
        <FooterText>추천 루틴</FooterText>
        <FooterText style={{color: colors.primary, marginBottom: "20px"}}>진정 위주 스킨케어 + 페이셜 수분 마스크 주 2회 권장</FooterText>
        </FooterWrapper>
      </RightSection>
    </Container>
  );
};
export default MainPage;


const Container=styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 80px;
  min-height: 50vh;
  padding: 120px 100px;
`
const LeftSection=styled.div`
  flex-direction: column;
  text-align:left;
  padding: 20px;
  max-width: 600px;
`
const RightSection = styled.div`
  width: 360px;
  height: 170px;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

const Title=styled.div`
  font-weight: bold;
  font-size: 2.5rem;
  line-height: 3.3rem;
  color: ${colors.primary};
  margin-bottom: 10px;
`
const Description=styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: 10px;
  color: ${colors.primary};
`
const AnalyzeButton=styled.button`
  border: none;
  border-radius: 20px;
  width: 140px;
  padding: 10px;
  text-align: center;
  font-size: 0.8em;
  color: white;
  background-color: ${colors.primary};
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.textAccent};
  }
`

const Icon = styled.img`
  width: 45px;
  height: 45px;
  object-fit: contain;
`;
const RecentAnalysis = styled.div` 
  display: flex;
  text-align: left;
  flex-direction: column;
  padding: 0 5px;
`

const BoxSectionTop=styled.div`
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;              
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
`
const BoxSectionBot=styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 0 0 0;     
`

const Detail = styled.div `
  width: 65px;
  height: 35px;
  border-radius: 7px;
  padding: 5px;
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`

const Symptom= styled.div`
  height: 10px;
  font-size: 10px;
  color: gray;
  margin: 3px;
`

const ResultPreview = styled.div`
  font-size: 13px;
  color: ${colors.primary};
  margin: 3px;
  font-weight: bold;
`
const FooterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;    
  margin: 6px 0 0 2px;
`

const FooterText =styled.div`
  height: auto;
  color: gray;
  margin: 0;
  font-size: 13px;
  padding: 0;
  line-height: 1.2; 

`
