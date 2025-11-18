import styled from "styled-components";
import colors from "../../common/colors";
const ProfileIcon = ({ name, size = 40 }) => {
  const initial = name ? name[0].toUpperCase() : "?";

  return <Circle size={size}>{initial}</Circle>;
};

export default ProfileIcon;

const Circle = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${colors.profile}; 
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${props => props.size * 0.3}px;
  user-select: none;
  flex-shrink: 0;
  margin-bottom: 8px;
`;