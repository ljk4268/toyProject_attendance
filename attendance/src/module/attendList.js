import { useDispatch, useSelector } from 'react-redux';
import { changObj } from '../store';
import axios from 'axios';

// 함수를 변수 안에 넣는다. 

export async function saveAttendList(calendarYear, calendarMonth){

  // 출석이 등록되고 나면 리스트 받기. 
  const list = await axios.get('/atndn/list')

  // 요소의 달과 리덕스 안의 현재 달을 비교 
  // 비교해서 true면 그 날짜는 우리가 써야하는 날짜 
  // 우리가 써야하는 날짜들을 객체안에 넣어둠 


  // attList : 데이터에서 받아온 배열  
  let attList = list.data.attendanceList

  // 객체 key : 년/월/일
  // 객체 value : 몇명인지. 
  // '2022-06-25' : 1
  let attListObj = {}

  // attList : 데이터에서 받아온 배열 반복문
  attList.forEach(function(att){
    // 받아온 데이터에서 달만 빼냄 
    let attYear = att.attendanceDate.split('-')[0];
    let attMonth = att.attendanceDate.split('-')[1];

    // 리덕스에 있는 달과 뺴온 달과 비교함 
    // true 
    if (calendarYear == attYear && calendarMonth == attMonth){
      // 이 if문 안에는 '달'로 걸러진 애들만 들어옴 
      // Object.keys(attListObj) = 객체명
      // includes(att.attendanceDate) = key이름이야. 
      // includes는 true 아니면 false
      if (Object.keys(attListObj).includes(att.attendanceDate) == false) {
        attListObj[att.attendanceDate] = 1;
      } else {
        attListObj[att.attendanceDate] += 1;
      }
    }
  })

  return attListObj;

}

