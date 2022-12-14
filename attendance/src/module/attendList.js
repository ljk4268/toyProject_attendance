import axios from 'axios';


/**
 * 서버에 연도와 월을 파라미터로 보내 파라미터에 해당되는 출석인원 리스트를 받는다. 
 * @param calendarYear : 캘린더에서 클릭한 날짜의 연도
 * @param calendarMonth : 캘린더에서 클릭한 날짜의 월
 * @returns attListObj객체에 해당월과 일에 몇명이 출석하는지 && 출석하는 사람들의 이름이 1달 분량으로 리턴된다.
 */

export async function saveAttendList(calendarYear, calendarMonth){

  const list = await axios.post(process.env.REACT_APP_API_ROOT + '/atndn/list', {
    "month": calendarMonth,
    "year": calendarYear
  })

  let attList = list.data.attendanceList

  let attListObj = {}; 

  attList.forEach(function(att){
    
    let attYear = att.attendanceDate.split('-')[0];
    let attMonth = att.attendanceDate.split('-')[1];

    if (calendarYear == attYear && calendarMonth == attMonth){

      if (Object.keys(attListObj).includes(att.attendanceDate) == false) {
        attListObj[att.attendanceDate] = {count : 1, name : [att.nickname]} 

      } else {
        attListObj[att.attendanceDate].count += 1;
        attListObj[att.attendanceDate].name.push(att.nickname);
      }

    }

  })

  return attListObj;

}

