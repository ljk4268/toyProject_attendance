import axios from "axios";
import { getToday } from './getToday'

let date = getToday();

//// 오늘 장소 등록되면 서버에 보내기 (22.08.02 - 03)
export async function postPlaces() {

  let place = document.getElementById("places").value;
  let official = "N";

  if (place == "") {
    return;
  }

  const todayPlace = await axios.post("/loc/entry", {
    attendanceDate: date,
    locationName: place,
    official: official,
  });

}

// 서버에 등록한 장소 가지고 오기 ( 22.08.02 - 03 )
export async function getPlaces(setTodayPlaces){
          
  const todayPlaces = await axios.post('/loc/list',{
    attendanceDate: date
  });
  const locationLists = todayPlaces.data.locationList;

  let listArray = [];

  // locationId , locationName , official
  locationLists.forEach((locationList)=>{
    listArray.push({
      'locationId' : locationList.locationId,
      'locationName' : locationList.locationName,
      'official' : locationList.official,
      'open' : false,
      'accountId': locationList.accountId
    })
  })
  
  setTodayPlaces(listArray)
};

