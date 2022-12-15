import axios from "axios";


// 오늘 날짜의 출석리스트 가져오기 
/**
 * 해당날짜에 해당되는 출석리스트를 받아온다.
 * @param setDateAttendanceNames : dateAttendanceNames의 변경함수
 * @param _date : 날짜
 * @returns 서버에서 받은 출석리스트 데이터 or state변경함수에 출석리스트넣어 리턴.  
 */
export async function getDateAttendance(setDateAttendanceNames, _date ) {

  const lists = await axios.post(process.env.REACT_APP_API_ROOT + '/atndn/list-on-date',{
    attendanceDate: _date
  });

  let todayAttendanceLists = lists.data.attendanceList
  let newArray = []
  
  if ( setDateAttendanceNames == null ){
    return todayAttendanceLists;
  }

  if (todayAttendanceLists == '') {
    newArray = [];
    setDateAttendanceNames(newArray);
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
    setDateAttendanceNames(newArray);
    
  });
}



//사용자가 출석등록 누르면 서버에 출석등록하기. 
export async function postDateAttendance(_seletedDate, _locationId, _mealStatus){

  if ( _locationId == '-1'){
    _locationId = null
  }

  const entry = await axios.post(process.env.REACT_APP_API_ROOT + "/atndn/entry", {
    attendanceDate: _seletedDate,
    locationId: _locationId,
    mealStatus: _mealStatus,
  });
  
  return entry;
}


// 사용자가 delete버튼 누르면 출석 취소하기. 
export async function postAttendanceCancel(_attendanceId){
  const cancelAttendance = await axios.post(process.env.REACT_APP_API_ROOT+ "/atndn/cancel", {
    attendanceId: _attendanceId
  });

}

// 사용자가 edit버튼 누르면 출석 변경하기. 
export async function postAttendanceUpdate(_attendanceDate,_locationId,_mealStatus,_attendanceId){

  if ( _locationId == '-1'){
    _locationId = null
  }

  const updateAtndn = await axios.post(process.env.REACT_APP_API_ROOT + "/atndn/change", {
    attendanceDate: _attendanceDate,
    attendanceId: _attendanceId,
    locationId: _locationId,
    mealStatus: _mealStatus,
  });

return updateAtndn

}

/**
 * 로그아웃 버튼을 누르면 서버와 통신 후 로그아웃 시켜주면서 로그인페이지로 이동하게 된다.
 * @param navigate : useNavigate()함수를 전달받는다.
 */
export async function signOut(navigate){

  const sign_out = await axios.post(process.env.REACT_APP_API_ROOT + "/sign-out")

    navigate('/')

}

/**
 * 해당연도와 월(달)에 출석체크한 사람들 리스트
 * @param _year : 연도
 * @param _month : 월(달)
 * @returns 해당연도와 월(달)에 출석체크한 사람들 리스트
 */
export async function attendanceStatus(_startDate, _endDate){

  const attStatus = await axios.post(process.env.REACT_APP_API_ROOT + "/atndn/attendance-status-on-month", {
    startDate: _startDate,
    endDate: _endDate
  });

  return attStatus;

}