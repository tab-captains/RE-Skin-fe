import styled from "styled-components";
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext";
const Recommended = () => {
  const { user } = useAuth();
  const keywords = ["지성", "입술 건조함", "주름"];

  return (
        <Container>
          <RecommendedTitleWrapper>
          <Keyword>{keywords[0]}</Keyword>
          <RecommendedTitle>타입의 {user ? user.username : " Guest"}님께 이런 제품을 추천해요!</RecommendedTitle>
          </RecommendedTitleWrapper>

          <RecommendedBox>
            <BoxTitle>{keywords[0]} 피부 타입 분석</BoxTitle>
            <BoxTypeText>----api 연결해야 함.----</BoxTypeText>
            <BoxDes><br />케어 방향만 올바르게 잡으면 맑고 균형 잡힌 피부로 돌아옵니다.<br></br>자 이제 {user? user.username: "Guest"}님께 딱 맞는 제품들을 소개해드릴게요!</BoxDes>
          </RecommendedBox>
        </Container>
  );
};

export default Recommended;

//애니메이션 처리.
const fadeUpStyle = `
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease;
`;





//styled-components
const Keyword = styled.div`
  padding: 8px 20px;
  border-radius: 25px;
  border: 1px solid ${colors.primary};
  background: ${colors.primary};
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: ${colors.primary};
    color: white;
  }
`;

const RecommendedTitle =styled.div`
display: flex;
margin-left: 15px;
align-items: center;
font-weight: bold;
color: rgba(25, 30, 50, 0.95);
`
const RecommendedBox =styled.div`
  width: 1100px;
  min-height: 150px; 
  padding: 24px;
  margin-top: 30px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.9);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  align-items: left;
`
const Container = styled.div`

`
const RecommendedTitleWrapper =styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  text-align: left;
`
const BoxTitle = styled.div`
  text-align: left;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: bold;
`
const BoxDes = styled.div`
  font-size: 13px;
`
const BoxTypeText = styled.div`
  font-size: 13px;
`