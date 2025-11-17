import styled from "styled-components";
import colors from "../../common/colors";
import useReveal from "../../common/hooks/useReveal"
import ProfileIcon from "../../common/components/ProfileIcon"

const BoardCard = () => {
  return (
      <PopularContainer>
      <p style={{margin: "5px",marginTop:"7px", fontWeight:"bold"}}>오늘의 인기 게시글</p>


      <PreviewCardItem >
        <ProfileIcon  name="윤규리" size={30}/>
        <TextWrapper>
          <Title>제목이 위치할 자리.</Title>
          <TagWrapper>
            <Tag>#태그1</Tag>
            <Tag>#태그2</Tag>
          </TagWrapper>
        </TextWrapper>
      </PreviewCardItem>

      <PreviewCardItem >
        <ProfileIcon  name="윤규리" size={30}/>
        <TextWrapper>
          <Title>제목이 위치할 자리.</Title>
          <TagWrapper>
            <Tag>#태그1</Tag>
            <Tag>#태그2</Tag>
          </TagWrapper>
        </TextWrapper>
      </PreviewCardItem>

        <PreviewCardItem >
        <ProfileIcon  name="윤규리" size={30}/>
        <TextWrapper>
          <Title>제목이 위치할 자리.</Title>
          <TagWrapper>
            <Tag>#태그1</Tag>
            <Tag>#태그2</Tag>
          </TagWrapper>
        </TextWrapper>
      </PreviewCardItem>
    </PopularContainer>
  );
};

export default BoardCard;


  const PreviewCardItem = ({ children }) => {
  const { ref, isRevealed } = useReveal({ threshold: [0.5, 0.1] });

  return (
    <PreviewCard ref={ref} className={isRevealed ? "visible" : ""}>
      {children}
    </PreviewCard>
  );
};



const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px; 
`;

const Title = styled.div`
  font-weight: bold;
  margin: 0;
  font-size: 15px;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;

const Tag = styled.div`
  font-size: 10px;
  margin-right: 5px;
  color: ${colors.primary};
`;

const PopularContainer = styled.div`
  width: 350px;
  background: ${colors.box};
  padding: 10px 15px 15px 15px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PreviewCard = styled.div`
  background: white;
  padding: 12px;
  border-radius: 10px;
  height: 45px;
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    background: #eceff3;
  }
  `