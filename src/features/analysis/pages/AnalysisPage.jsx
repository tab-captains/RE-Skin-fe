import styled, { keyframes } from "styled-components";
import colors from "../../common/colors";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import AnalysisResultPage from "./AnalysisResultPage"; 

const AnalysisPage = () => {
  const { user } = useAuth();
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowOverlay(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showOverlay && (
        <Overlay>
          <MessageWrapper>
            <Message>
              {user ? user.username : "Guest"}님을 위한 분석을 완료했어요!
            </Message>
          </MessageWrapper>
        </Overlay>
      )}
      {!showOverlay && <AnalysisResultPage />}
    </>
  );
};
export default AnalysisPage;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 247, 250, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const MessageWrapper = styled.div`
  animation: ${fadeInUp} 1s ease-out forwards;
`;

const Message = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: ${colors.primary};
  text-align: center;
`;
