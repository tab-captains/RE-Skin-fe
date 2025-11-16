import styled from "styled-components";

const GaugeCircle = ({ label, value, max }) => {
  const percentage = (value / max) * 100;

  let status = "";
  if (percentage >= 70) status = "높음";
  else if (percentage >= 40) status = "보통";
  else status = "낮음";

  return (
    <Wrapper>
      <Label>{label}</Label>
      <svg width="90" height="90">
        <circle
          cx="45"
          cy="45"
          r="40"
          stroke="#1768AC"
          strokeWidth="7"
          fill="none"
        />
        <circle
          cx="45"
          cy="45"
          r="40"
          stroke="white"
          strokeWidth="7"
          fill="none"
          strokeDasharray={2 * Math.PI * 40}
          strokeDashoffset={(1 - percentage / 100) * 2 * Math.PI * 40}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
        />
        <text
          x="45"
          y="44"
          textAnchor="middle"
          fontSize="25"
          fill="white"
        >
          {value}
        </text>
        <text
          x="45"
          y="64"
          textAnchor="middle"
          fontSize="12"
          fill="white"
        >
          {status}
        </text>
      </svg>
    </Wrapper>
  );
};


export default GaugeCircle;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.div`
  margin-bottom: 8px;
  font-size: 12px;
  color: white;
`;