import MainPage from './component/mainPage'
import CalendarPage from './component/calendarPage'
import Login from './component/login'
import Kakao from './component/kakao'

import {Routes, Route} from 'react-router-dom'


import './App.css';


function App() {

  return (
      <div className="App">
    
      <Routes>
        
        {/* 로그인페이지 */}
        <Route path="/" element={<Login/>}/>

        {/* 카카오톡로그인을 위해 카카오서버와 통신하는 페이지 */}
        <Route path="/oauth/kakao/callback" element={<Kakao/>}/>

        {/* 캘린더페이지 */}
        <Route path="/calendar" element={<CalendarPage/>}/>

        {/* 메인페이지 */}
        <Route path="/main" element={<MainPage/>}/>
        
      </Routes>

    </div>
  );
}


export default App;
