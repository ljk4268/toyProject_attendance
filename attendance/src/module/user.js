import axios from "axios";
import { getToday } from './getToday'


let todayDate = getToday();

// 오늘 날짜의 출석리스트 가져오기 
export async function getTodayAttendance(setTodayAttendanceNames) {

  const lists = await axios.post('/atndn/list-on-date',{
    attendanceDate: todayDate
  });

  let todayAttendanceLists = lists.data.attendanceList
  let newArray = []

  todayAttendanceLists.forEach((element) => {
    newArray.push({
      nickname : element.nickname,
      attendanceId: element.attendanceId,
      locationName: element.locationName,
      locationId: element.locationId,
      mealStatus: element.mealStatus
    }) 

    setTodayAttendanceNames(newArray);
  });
}

//사용자가 출석등록 누르면 서버에 출석등록하기. 

export async function postTodayAttendance(_seletedDate, _locationId, _mealStatus){

  if ( _locationId == '-1'){
    _locationId = null
  }

  const entry = await axios.post("/atndn/entry", {
    attendanceDate: _seletedDate,
    locationId: _locationId,
    mealStatus: _mealStatus,
  });
  
  return entry;
}