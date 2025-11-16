import styled from "styled-components";
import colors from "../../common/colors";
import skinTypeIcon from '../../../assets/images/skinTypeIcon.png';
const RightSection = () =>{

  return (
      <Wrapper>
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
      </Wrapper>
  )
}


const Wrapper = styled.div`
  width: 360px;
  height: 170px;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 7px;
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
export default RightSection;