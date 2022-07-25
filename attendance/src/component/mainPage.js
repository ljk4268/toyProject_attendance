import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Popup from './popUp'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeMonth, changObj } from './../store'
import { saveAttendList } from '../module/attendList'



function MainPage(){

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")

  const handleDateClick = (e) => { 
    setOpen(true)
    setDate(e.dateStr)
  }

  // redux store에서 state 가져다쓰기 
  // redux store를 가져와주는 useSelector()
  let state = useSelector((state)=>{ return state })
  let userName = state.user.nickname;
  let calendarMonth = state.month.month;
  let calendarYear = state.month.year;
  let $attObj = state.$attObj
  let $eventAttList = []

  // $attObj를 반복문 돌려. >> 
  // 요소 하나당 key와 value가 나올거고 
  // 그 값을 가지고 임시 객체변수를 하나 만들어서 
  // 그 객체변수에 title: value / start : key가 돼.
  
  for ( var key in $attObj ){
    let tempObj = {}
    tempObj['title'] = $attObj[key]
    tempObj['start'] = key
    $eventAttList.push(tempObj)

  }

  let dispatch = useDispatch()

  useEffect(()=>{
    async function fetchData() {
      let attListObj = await saveAttendList(year, month)
      dispatch(changObj(attListObj))
  }
  fetchData();

    dispatch(changeMonth({year: year, month: month}))
  },[month])

  

  
  return(
    <>
      <button>{calendarMonth} {calendarYear}</button>
      <FullCalendar
          datesSet={(arg) => {
            let argTitle = arg.view.title.split(' ');
            setYear(argTitle[0].replace('년',''))
            setMonth(argTitle[1].replace('월',''))
        }
      }
          plugins={[ dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          initialView="dayGridMonth"
          weekends={true}
          events={$eventAttList}
          titleFormat = {function(date){
            return `${date.date.year}년 ${String(date.date.month + 1).padStart(2,'0')}월`
          }}
        
      />  
      <Popup open={open} setOpen={setOpen} date={date}></Popup>
    </>
  )
};

export default MainPage;