import axios from "axios";
import { getToday } from "./getToday";

//// 오늘 장소 등록되면 서버에 보내기 (22.08.02 - 03)
export async function postPlaces(date) {
  let place = document.getElementById("places").value;
  let official = "N";

  if (place == "") {
    return;
  }

  const todayPlace = await axios.post(
    process.env.REACT_APP_API_ROOT + "/loc/entry",
    {
      attendanceDate: date,
      locationName: place,
      official: official,
    }
  );
}

// 서버에 등록한 장소 가지고 오기 
/**
 * 해당 날짜에 등록된 모임장소를 서버에서 받아와 state변경함수로 모임장소 리스트 변경해준다.
 * @param setDatePlaces : 해당날짜에 등록된 모임장소 변경함수
 * @param _date : 날짜
 */
export async function getPlaces(setDatePlaces, _date) {
  const datePlaces = await axios.post(
    process.env.REACT_APP_API_ROOT + "/loc/list",
    {
      attendanceDate: _date,
    }
  );

  const locationLists = datePlaces.data.locationList;

  let listArray = [];

  locationLists.forEach((locationList) => {
    listArray.push({
      locationId: locationList.locationId,
      locationName: locationList.locationName,
      official: locationList.official,
      open: false,
      accountId: locationList.accountId,
    });
  });

  setDatePlaces(listArray);
}

// 서버에 등록된 장소 삭제하기
export async function deletePlace(_locationId) {
  const deletePlace = await axios.post(
    process.env.REACT_APP_API_ROOT + "/loc/cancel",
    {
      locationId: _locationId,
    }
  );
  return deletePlace;
}
