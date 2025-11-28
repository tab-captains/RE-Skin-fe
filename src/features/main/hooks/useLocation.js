import {useState, useEffect} from 'react';
import axios from "axios";

export default function useLocation(){
  const [address, setAddress] = useState({sidoName: "", regionName: ""}); //위도,경도 초기화.
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(!navigator.geolocation){
      setError("위치 정보를 지원하지 않는 브라우저입니다.");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        console.log(lat, lon)

        try {
          const res =await axios.get(
             `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`,
              {
              headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}` },
            }
          );
          console.log(res)
          const addr = res.data.documents[0].address;
          const newAddress = {
            sidoName: addr.region_1depth_name,
            regionName : addr.region_2depth_name
          };
          setAddress(newAddress);

          await axios.post("/api/user/location", newAddress);
        }catch(err){
          setError("주소 변환 또는 전송 중 오류 발생.");
          console.log(err);
        }
      }, (err)=>setError(err.message)
    );
  },[]);

    return { address, error };
}