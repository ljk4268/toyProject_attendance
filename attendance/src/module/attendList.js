import axios from 'axios';

// 함수를 변수 안에 넣는다. 

export async function saveAttendList(calendarYear, calendarMonth){

  // "month": "string",
  // "year": "string"
  // 출석이 등록되고 나면 리스트 받기. 
  const list = await axios.post(process.env.REACT_APP_API_ROOT + '/atndn/list', {
    "month": calendarMonth,
    "year": calendarYear
  })

  // 요소의 달과 리덕스 안의 현재 달을 비교 
  // 비교해서 true면 그 날짜는 우리가 써야하는 날짜 
  // 우리가 써야하는 날짜들을 객체안에 넣어둠 
  // attList : 데이터에서 받아온 배열  
  let attList = list.data.attendanceList

  let attListObj = {}; 

  // attList : 데이터에서 받아온 배열 반복문
  attList.forEach(function(att){
    
    // 받아온 데이터에서 달만 빼냄 
    let attYear = att.attendanceDate.split('-')[0];
    let attMonth = att.attendanceDate.split('-')[1];

    // 리덕스에 있는 달과 뺴온 달과 비교함 
    // true 
    if (calendarYear == attYear && calendarMonth == attMonth){
      // 이 if문 안에는 '년'과 '달'로 걸러진 애들만 들어옴 

      // attListArray 배열에 들어가야할 데이터
      // { 키값(날짜) : {count , 사람이름들} ,
      // 키값(날짜) : {count , 사람이름들} , 
      // 키값(날짜) : {count , 사람이름들} , 
      // 키값(날짜) : {count , 사람이름들} ,  }

      //{ 
      //  2022-06-24:{ count: 1, name:[] },
      //  2022-06-25:{ count: 1, name:[] }
      // }

      
      if (Object.keys(attListObj).includes(att.attendanceDate) == false) {
        attListObj[att.attendanceDate] = {count : 1, name : [att.nickname]} 

      } else {
        attListObj[att.attendanceDate].count += 1;
        attListObj[att.attendanceDate].name.push(att.nickname);
      }

      // 너는 이것을 무조건 잘 기억해야해. 
      // 깊은복사를 생각하지 못했던 실수였는데 
      // 어떤 원인이였고 어떻게 해결해야했느닞~~~~ 면접떄!

    }

  })

  return attListObj;

}

