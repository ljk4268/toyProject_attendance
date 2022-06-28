import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import './App.css';

function App() {
  return (
    <div className="App">
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends={true}
        events={[
          { title: '이자경출석', 
            start: '2022-06-08T19:00:00'},
        ]}
      />
    </div>
  );
}

const handleDateClick = (e) => { 
  alert(e.dateStr)
}


export default App;
