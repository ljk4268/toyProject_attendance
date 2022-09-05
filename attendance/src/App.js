import MainPage from './component/mainPage'
import AttendRegistration from './component/attendRegistation'
import CalendarPage from './component/calendarPage'
import AdiminPage from './component/adminPage'
import SystemAdiminPage from './component/systemAdmin'
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

            {/* 출석등록페이지 */}
            <Route path="/registration" element={<AttendRegistration/>}/>

            {/* 관리자페이지 */}
            <Route path="/adminpage" element={<AdiminPage/>}/>

            {/* 시스템관리자페이지 */}
            <Route path="/systemadminpage" element={<SystemAdiminPage/>}/>
            
          </Routes>
    </div>
  );
}


export default App;
