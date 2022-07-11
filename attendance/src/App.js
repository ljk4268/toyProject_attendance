import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import Popup from './component/popUp'
import Login from './component/login'


import './App.css';


function App() {
  const [mode, setMode] = useState('LOGIN')
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")

  const handleDateClick = (e) => { 
    setOpen(true)
    setDate(e.dateStr)
  }

  let content = null;

  if( mode === 'LOGIN' ) {
    content = <Login setMode={setMode}></Login>
    
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

      {content}
      
      <Popup open={open} setOpen={setOpen} date={date}></Popup>

    </div>
  );
}







export default App;
