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
export async function getPlaces(setDatePlaces, _date) {
  const datePlaces = await axios.post(
    process.env.REACT_APP_API_ROOT + "/loc/list",
    {
      attendanceDate: _date,
    }
  );

  const locationLists = datePlaces.data.locationList;

  let listArray = [];

  // locationId , locationName , official
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
