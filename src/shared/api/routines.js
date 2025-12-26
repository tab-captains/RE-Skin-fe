import instance from "./axiosInstance";

/**
 * 루틴 상세 조회
 * @param {"MORNING" | "NIGHT"} routineType
 */
export const getRoutine = async (routineType) => {
  if (!routineType) {
    throw new Error("routineType이 필요합니다.");
  }

  const response = await instance.get(`/api/routines/type/${routineType}`);
  return response.data.data;
};


export const getUserSkinType = async () => {
  try {
    const res = await instance.get("/api/user/skin-type/ment");
    return res.data.data; 
  } catch (err) {
    console.error("피부 타입 멘트 조회 실패:", err);
    throw err;
  }
};

/*=======================mock data========================== */

  export const morningRoutine =  [
    {
      img: "../../assets/images/skinTypeIcon.png",
      title: "(아침)클렌징",
      desc: "가벼운 세안으로 피부 노폐물 제거"
    },
    {
      img: "../../assets/images/skinTypeIcon.png",
      title: "토너",
      desc: "수분 공급 및 피부 진정"
    },
    {
      img: "../../assets/images/skinTypeIcon.png",
      title: "크림",
      desc: "보습과 피부 장벽 강화"
    }
  ];


export const morningProducts = [
  {img: "../../assets/images/skinTypeIcon.png",title: "제품1",desc: "(아침)설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품2",desc: "설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품3",desc: "설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품4",desc: "설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품5",desc: "설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품6",desc: "설명이 여기 들어갑니다.~"},
]

//아침, 저녁으로 skin type에 대한 데이터가 다른지 확인 필요. 일단 분리해둠. 
export const morningSkinType = {
  type: "oily",
  typeName: "지성",
  description:
    "(아침)피지 분비가 활발하여 번들거림이 쉽게 나타나는 피부 타입입니다. 모공이 넓어 보일 수 있으며 트러블도 쉽게 생길 수 있어요.",
  tip: "가벼운 수분 공급과 과도한 유분 조절이 핵심이에요! 과한 오일 제품은 피하고 젤 타입 수분제를 추천드려요.",
};




//========================================================//
//저녁 루틴 페이지용 데이터.
  export const nightRoutine =  [
    {
      img: "../../assets/images/skinTypeIcon.png",
      title: "(저녁)클렌징",
      desc: "가벼운 세안으로 피부 노폐물 제거"
    },
    {
      img: "../../assets/images/skinTypeIcon.png",
      title: "토너",
      desc: "수분 공급 및 피부 진정"
    },
    {
      img: "../../assets/images/skinTypeIcon.png",
      title: "크림",
      desc: "보습과 피부 장벽 강화"
    }
  ];


export const nightProducts = [
  {img: "../../assets/images/skinTypeIcon.png",title: "제품1",desc: "(저녁)설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품2",desc: "설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품3",desc: "설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품4",desc: "설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품5",desc: "설명이 여기 들어갑니다.~"},
  {img: "../../assets/images/skinTypeIcon.png",title: "제품6",desc: "설명이 여기 들어갑니다.~"},
]


export const nightSkinType = {
  type: "oily",
  typeName: "지성",
  description:
    "(저녁)피지 분비가 활발하여 번들거림이 쉽게 나타나는 피부 타입입니다. 모공이 넓어 보일 수 있으며 트러블도 쉽게 생길 수 있어요.",
  tip: "가벼운 수분 공급과 과도한 유분 조절이 핵심이에요! 과한 오일 제품은 피하고 젤 타입 수분제를 추천드려요.",
};


