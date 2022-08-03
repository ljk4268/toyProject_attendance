import axios from "axios";
import { getToday } from './getToday'


let date = getToday();

// 오늘 날짜의 출석리스트 가져오기 
export async function getTodayAttendance(setTodayAttendanceNames) {

  const lists = await axios.post('/atndn/list-on-date',{
    attendanceDate: date
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