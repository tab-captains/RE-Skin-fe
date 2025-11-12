const colors= {
  primary:"#1F3058",
  textAccent:"#123DA0",
  point:"#1768AC",
  profile:"#446095",
  background: "#FFFFFF",
  box:"#EBEEF2"
};

export default colors;


/* colors.js는 공통적으로 쓰는 색상 팔레트를 모아놓은 파일.
  1. colors 객체의 색상은 임의로 변경 X. (본인 페이지에서 실행해보고 팀원과 상의 후 변경!) 
  2. 없는 색상은 colors 객체 안에 추가해서 사용(요소명은 형식 지켜서 이해 쉽게).
  3. 색상은 최대한 이 객체에 정의해서 사용. (재사용 가능성 없는 건 안 해도 됨.) */

/*각 파일에서 import 후 colors.요소명으로 사용. */