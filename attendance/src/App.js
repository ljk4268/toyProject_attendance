import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Popup from './component/popUp'
import Login from './component/login'
import Kakao from './component/kakao'

import {Routes, Route} from 'react-router-dom'


import './App.css';


function App() {
  

  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")

  const handleDateClick = (e) => { 
    setOpen(true)
    setDate(e.dateStr)
  }


  return (
      <div className="App">
    

      <Routes>
        {/* 로그인페이지 */}
        <Route path="/" element={<Login/>}/>

        {/* 카카오톡로그인을 위해 카카오서버와 통신하는 페이지 */}
        <Route path="/oauth/kakao/callback" 
        element={<Kakao/>}/>

        {/* 메인페이지 */}
        <Route path="/main" element={
          <FullCalendar
              plugins={[ dayGridPlugin, interactionPlugin]}
              dateClick={handleDateClick}
              initialView="dayGridMonth"
              weekends={true}
              events={[
                { title: '출석', 
                  start: '2022-07-09'},
            ]}
          />
        }/>
        
      </Routes>

      <Popup open={open} setOpen={setOpen} date={date}></Popup>


    </div>
  );
}







export default App;
