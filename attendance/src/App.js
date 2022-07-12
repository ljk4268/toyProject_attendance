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
  

  const [mode, setMode] = useState('LOGIN')
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")
  const [change, setChange] = useState('true')

  const handleDateClick = (e) => { 
    setOpen(true)
    setDate(e.dateStr)
  }

  useEffect(()=>{
    console.log(mode)
    console.log('확인중')
  }, [mode])

  let content = null;


  if( mode === 'LOGIN' ) {
    content = <Login setMode={setMode}></Login>
    
  } else if( mode === 'Kakao' ) {
    content = ''
  } else if ( mode === 'Calendar'){
    content = 
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
  }

  return (
    <div className="App">

      <Routes>
        {/* 로그인페이지 */}
        <Route path="/" element={<Login/>}/>

        {/* 카카오톡 뭔가를 받는 페이지 */}
        <Route path="/auth/kakao/callback" 
        element={<Kakao setMode={setMode}/>}/>

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
