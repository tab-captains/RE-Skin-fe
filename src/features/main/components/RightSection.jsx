import styled from "styled-components";
import colors from "../../common/colors";
import skinTypeIcon from '../../../assets/images/skinTypeIcon.png';
import { useAuth } from "../../auth/context/AuthContext";
import { useState, useEffect } from "react";
import { getLatestAnalysisSummary } from "../../../shared/api/skinAnalysis";
import { useNavigate } from "react-router-dom";

const RightSection = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLatestAnalysis = async () => {
      // 로그인하지 않은 경우는 하드코딩된 데이터 사용
      if (!isLoggedIn) {
        setAnalysisData(null);
        return;
      }

      // 로그인한 경우에만 API 호출
      try {
        setLoading(true);
        const response = await getLatestAnalysisSummary();
        
        if (response && response.success && response.data) {
          setAnalysisData(response.data);
        }
      } catch (error) {
        console.error("최근 분석 결과 조회 실패:", error);
        setAnalysisData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, [isLoggedIn]);

  const handleClick = () => {
    if (isLoggedIn && analysisData) {
      navigate("/analysis");
    }
  };

  // 로그인하지 않은 경우: 하드코딩된 데이터
  const userName = isLoggedIn && user ? (user.nickname || user.username) : null;
  const skinType = isLoggedIn && analysisData 
    ? (analysisData.skinTypeLabel || analysisData.skinType || "민감성")
    : "민감성";
  const acneLabel = isLoggedIn && analysisData 
    ? (analysisData.acneLabel || "관리 필요")
    : "관리 필요";
  const poresLabel = isLoggedIn && analysisData 
    ? (analysisData.poresLabel || "적음")
    : "적음";
  const wrinkleLabel = isLoggedIn && analysisData 
    ? (analysisData.wrinkleLabel || "관리 필요")
    : "관리 필요";
  const lipLabel = isLoggedIn && analysisData 
    ? (analysisData.lipLabel || "관리 필요")
    : "관리 필요";

  // 텍스트 줄바꿈 처리 함수
  const formatLabel = (label) => {
    if (!label) return label;
    
    // "정상에 가까움" -> "정상에\n가까움"
    if (label.includes("정상에 가까움")) {
      return "정상에\n가까움";
    }
    // "가벼운 관리 필요" -> "가벼운\n관리 필요"
    if (label.includes("가벼운 관리")) {
      return "가벼운\n관리 필요";
    }
    
    return label;
  };

  // 추천 루틴 텍스트 생성
  const getRecommendationText = () => {
    if (isLoggedIn && analysisData) {
      const skinType = analysisData.skinType || analysisData.skinTypeLabel || "";
      if (skinType.includes("민감")) {
        return "진정 위주 스킨케어 + 페이셜 수분 마스크 주 2회 권장";
      } else if (skinType.includes("지성")) {
        return "유분 조절 스킨케어 + 클레이 마스크 주 1-2회 권장";
      } else if (skinType.includes("건성")) {
        return "수분 보충 스킨케어 + 수분 마스크 주 2-3회 권장";
      }
    }
    return "진정 위주 스킨케어 + 페이셜 수분 마스크 주 2회 권장";
  };

  return (
      <Wrapper onClick={handleClick} $clickable={isLoggedIn && analysisData}>
        <BoxSectionTop>
        <Icon src={skinTypeIcon} alt="../../../assets/images/skinTypeIcon.png"></Icon>
        <RecentAnalysis>
          <p style={{fontSize: '10px', height: '11px', margin: '3px', color: "gray"}}>
             {isLoggedIn && userName
             ? `${userName} 님의 최근 분석` 
             : "최근 분석"}
          </p>
          <p style={{fontSize: '17px', height: 'auto',margin: '3px', fontWeight: "bold" , color: colors.primary}}>
            {isLoggedIn && loading ? "로딩 중..." : skinType}
          </p> 
        </RecentAnalysis> 
        </BoxSectionTop>
        <BoxSectionBot>
          <Detail>
            <Symptom>여드름</Symptom>
            <ResultPreview>{isLoggedIn && loading ? "-" : formatLabel(acneLabel)}</ResultPreview>
          </Detail>
          <Detail>
            <Symptom>모공</Symptom>
            <ResultPreview>{isLoggedIn && loading ? "-" : formatLabel(poresLabel)}</ResultPreview>
          </Detail>
          <Detail>
            <Symptom>주름</Symptom>
            <ResultPreview>{isLoggedIn && loading ? "-" : formatLabel(wrinkleLabel)}</ResultPreview>
          </Detail>
          <Detail>
            <Symptom>입술건조</Symptom>
            <ResultPreview>{isLoggedIn && loading ? "-" : formatLabel(lipLabel)}</ResultPreview>
          </Detail>
        </BoxSectionBot>
        <FooterWrapper>
        <FooterText>추천 루틴</FooterText>
        <FooterText style={{color: colors.primary, marginBottom: "20px"}}>
          {isLoggedIn && loading ? "로딩 중..." : getRecommendationText()}
        </FooterText>
        </FooterWrapper>
      </Wrapper>
  )
}


const Wrapper = styled.div`
  width: 360px;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  transition: 0.2s ease;
  &:hover {
    ${({ $clickable }) => $clickable && "box-shadow: 0 10px 25px rgba(0,0,0,0.2);"}
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
  border-bottom: 1px solid rgba(54, 54, 54, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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
  min-height: 35px;
  height: auto;
  border-radius: 8px;
  padding: 5px;
  border: 1px solid rgba(54, 54, 54, 0.5);
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
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
  font-size: 12px;
  color: ${colors.primary};
  margin: 2px;
  font-weight: bold;
  line-height: 1.3;
  white-space: pre-line;
  word-break: keep-all;
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