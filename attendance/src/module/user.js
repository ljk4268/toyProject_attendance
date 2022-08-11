import axios from "axios";
import { getToday } from './getToday'



let todayDate = getToday();

// 오늘 날짜의 출석리스트 가져오기 
export async function getDateAttendance(setTodayAttendanceNames, _date, editMode) {

  const lists = await axios.post('/atndn/list-on-date',{
    attendanceDate: _date
  });
  let todayAttendanceLists = lists.data.attendanceList
  let newArray = []
  
  if ( editMode == true ){
    return todayAttendanceLists;
  }

  if (todayAttendanceLists == '') {
    newArray = [];
    setTodayAttendanceNames(newArray);
  }

  todayAttendanceLists.forEach((element) => {
    newArray.push({
      nickname : element.nickname,
      attendanceId: element.attendanceId,
      locationName: element.locationName,
      locationId: element.locationId,
      mealStatus: element.mealStatus,
      accountId : element.accountId
    }) 

    // 리덕스 dispatch(변경함수(newArray) << 이거 맞아?
    setTodayAttendanceNames(newArray);
    
  });
}



//사용자가 출석등록 누르면 서버에 출석등록하기. 
export async function postDateAttendance(_seletedDate, _locationId, _mealStatus){

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


// 사용자가 delete버튼 누르면 출석 취소하기. 
export async function postAttendanceCancel(_attendanceId){

  const cancelAttendance = await axios.post("/atndn/cancel", {
    attendanceId: _attendanceId
  });

}

// 사용자가 edit버튼 누르면 출석 변경하기. 
export async function postAttendanceUpdate(_attendanceDate,_locationId,_mealStatus,_attendanceId){

  if ( _locationId == '-1'){
    _locationId = null
  }

  const updateAtndn = await axios.post("/atndn/change", {
    attendanceDate: _attendanceDate,
    attendanceId: _attendanceId,
    locationId: _locationId,
    mealStatus: _mealStatus,
  });

return updateAtndn

}