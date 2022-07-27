import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Popup from './popUp'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeMonth, changArray } from './../store'
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
  let calendarMonth = state.month.month;
  let calendarYear = state.month.year;
  let $attArray = state.$attArray;
  let $eventAttList = [];
  let dispatch = useDispatch();


  $attArray.forEach(function(attArray, i){

      let tempObj = {};

      tempObj['title'] = attArray.count;
      tempObj['start'] = attArray.date;

      $eventAttList.push(tempObj)
    })
  
  

  useEffect(()=>{
    async function fetchData() {
      let attListArray = await saveAttendList(year, month)
      dispatch(changArray(attListArray))
  }
  fetchData();

    dispatch(changeMonth({year: year, month: month}))

  },[month])

  

  
  return(
    <>
      <button>{calendarMonth} {calendarYear}</button>
      <FullCalendar
          datesSet={(arg) => {
            console.log(arg)
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