import styled from "styled-components"
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext";
import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ResultTop from "../components/ResultTop";
import SkinScoreGrid from "../components/SkinScoreGrid";


const AnalysisResultPage=()=>{
  const {user} = useAuth();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // localStorage에서 분석 결과 가져오기
    const storedResult = localStorage.getItem("analysisResult");
    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult);
        setAnalysisData(parsed);
      } catch (error) {
        console.error("분석 결과 파싱 실패:", error);
        alert("분석 결과를 불러올 수 없습니다.");
        navigate("/upload");
      }
    } else {
      // 분석 결과가 없으면 업로드 페이지로 리다이렉트
      alert("분석 결과가 없습니다. 다시 분석해주세요.");
      navigate("/upload");
    }
  }, [navigate]);

  if (!analysisData) {
    return (
      <Container>
        <LoadingMessage>분석 결과를 불러오는 중...</LoadingMessage>
      </Container>
    );
  }

  // API 응답 필드를 컴포넌트에서 사용할 형식으로 매핑
  const skinTypeMap = {
    "COMBINATION": "복합성",
    "DRY": "건성",
    "OILY": "지성",
    "NORMAL": "중성",
    "SENSITIVE": "민감성"
  };

  const displaySkinType = skinTypeMap[analysisData.skinType] || analysisData.skinType;

  return(
    <>
    <Container>
      <Header>
        <p style = {{marginTop: "20px"}}>오늘의 피부 상태</p>
        <h2>{displaySkinType} 피부</h2>
        <p><b>Re:Skin</b>이 {user?.nickname || user?.username || "Guest"}님의 피부 컨디션을 살펴보고 있어요.</p>
        <h2>{analysisData.totalScore}/100</h2>
      </Header>
      <ResultTop 
        skinType={displaySkinType}
        skinTypeDescription={analysisData.skinTypeDescription}
        summaryMessage={analysisData.summaryMessage}
      />
      <SkinScoreGrid 
        acneScore={analysisData.acneScore}
        acneMessage={analysisData.acneMessage}
        wrinkleScore={analysisData.wrinkleScore}
        wrinkleMessage={analysisData.wrinkleMessage}
        poresScore={analysisData.poresScore}
        poresMessage={analysisData.poresMessage}
        lipScore={analysisData.lipScore}
        lipMessage={analysisData.lipMessage}
      />
    </Container>
    </>
  );
};
export default AnalysisResultPage; 

const Header = styled.div`
  text-align: center;
  p{
    font-size: 13px;
    margin: 10px;
  }
  h2{
    margin: 5px;
  }
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 30px;
  margin-bottom: 100px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: ${colors.primary};
`;
