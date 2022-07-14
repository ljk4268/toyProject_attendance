import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Popup from './popUp'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function MainPage(){

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")

  const handleDateClick = (e) => { 
    setOpen(true)
    setDate(e.dateStr)
  }

  // redux store에서 state 가져다쓰기 
  // redux store를 가져와주는 useSelector()
  let state = useSelector((state)=>{ return state })
  console.log(state.user)
  let userName = state.user.nickname;
  
  return(
    <>
      <p>{userName}의 출석현황</p>
      <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          initialView="dayGridMonth"
          weekends={true}
          events={[
            { title: userName, 
              start: '2022-07-09'},
        ]}
      />  
      <Popup open={open} setOpen={setOpen} date={date}></Popup>
    </>
  )
};

export default MainPage;