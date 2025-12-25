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
      if (!isLoggedIn) {
        setAnalysisData(null);
        return;
      }

      try {
        setLoading(true);
        const response = await getLatestAnalysisSummary();
        if (response && response.success && response.data) {
          setAnalysisData(response.data);
        } else {
          setAnalysisData(null); // 데이터가 없는 경우
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

  const handleNavigate = () => {
    navigate("/analysis");
  };

  
  const formatLabel = (label) => {
    if (!label) return label;
    if (label.includes("정상에 가까움")) return "정상에\n가까움";
    if (label.includes("가벼운 관리")) return "가벼운\n관리 필요";
    return label;
  };
const userName = isLoggedIn && user ? (user.nickname || user.username) : null;


  const getSkinTypeText = () => {
    if (loading) return "로딩 중...";
    if (!isLoggedIn) return "민감성"; 
    if (isLoggedIn && !analysisData) return "분석 데이터 없음"; 
    return analysisData.skinTypeLabel || analysisData.skinType; 
  };

  return (
    <Wrapper 
      onClick={isLoggedIn && analysisData ? handleNavigate : undefined} 
      $clickable={isLoggedIn && analysisData}
    >
      <BoxSectionTop>
        <Icon src={skinTypeIcon} alt="Skin Type Icon" />
        <RecentAnalysis>
          <p style={{ fontSize: '10px', margin: '3px', color: "gray" }}>
            {isLoggedIn && userName ? `${userName} 님의 최근 분석` : "최근 분석"}
          </p>
          <p style={{ fontSize: '17px', fontWeight: "bold", color: colors.primary, margin: '3px' }}>
            {getSkinTypeText()}
          </p>
        </RecentAnalysis>
      </BoxSectionTop>

      {isLoggedIn && !analysisData && !loading ? (
        <EmptyStateWrapper>
          <EmptyText>정확한 분석을 위해 검사를 진행해 주세요.</EmptyText>
          <GoToAnalysisBtn onClick={(e) => { e.stopPropagation(); navigate('/skin-survey'); }}>
            분석하러 가기
          </GoToAnalysisBtn>
        </EmptyStateWrapper>
      ) : (

        <>
          <BoxSectionBot>
          </BoxSectionBot>
          <FooterWrapper>
          </FooterWrapper>
        </>
      )}
    </Wrapper>
  );
};



const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  gap: 12px;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const GoToAnalysisBtn = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

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