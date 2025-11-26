import instance from "./axiosInstance";


//설문 결과 서버에 전송.
export const submitSurvey = async (surveyData) =>{
  const res = await instance.post("/api/survey", surveyData); //서버에 surveyData를 보냄.
  console.log(res);  //res=전체 응답 객체.
  return res.data;  //Axios가 서버로부터 받은 실제 응답 데이터. 
}
