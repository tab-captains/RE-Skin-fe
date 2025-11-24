import styled from "styled-components";
import colors from "../../common/colors";
import { useAuth } from "../../auth/context/AuthContext";

const ProductList = ({productData}) => {

    const productsList = productData || [
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "제품1",
      desc: "설명이 여기 들어갑니다.~"
    },
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "제품2",
      desc: "설명이 여기 들어갑니다.~"
    },
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "제품3",
      desc: "설명이 여기 들어갑니다.~"
    },
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "제품4",
      desc: "설명이 여기 들어갑니다.~"
    },
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "제품5",
      desc: "설명이 여기 들어갑니다.~"
    },
    {
      img: "../../../assets/images/skinTypeIcon.png",
      title: "제품6",
      desc: "설명이 여기 들어갑니다.~"
    },

  ];
  return(
    <ComponentWrapper>
      <Title>추천 제품 리스트</Title>
      <Container>
      {productsList.map((list, idx) => (
        <ListWrapper key={idx}>
          <List>
            <ListImg src={list.img} alt={list.title}></ListImg>
            <Wrapper>
              <ListTitle>{list.title}</ListTitle>
              <ListDes>{list.desc}</ListDes>
            </Wrapper>
          </List>
        </ListWrapper>
      ))}
     </Container>
    </ComponentWrapper>
  )
}

export default ProductList;

//애니메이션 처리.
const fadeUpStyle = `
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.7s ease;
`;






//styled-components

const ComponentWrapper =styled.div`
  margin-top: 100px;
`
const Container=styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; 
`
const Title=styled.div`
margin: 40px;
text-align: center;
font-weight: bold;
font-size: 25px;
color: rgba(25, 30, 50, 0.95);
`
const ListWrapper= styled.div`
  display: flex;
  align-items: center;
`
const List = styled.div`
  width: 500px;
  height: 200px;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.9);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: row;
`
const ListImg= styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 12px;
  border: 1px dashed gray;
  border-radius: 15px;
  margin-right: 30px;
`
const Wrapper =styled.div`
display: flex;
flex-direction: column;

`
const ListTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`
const ListDes= styled.div`
font-size: 13px;
`