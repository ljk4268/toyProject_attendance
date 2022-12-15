import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { changObj } from "../redux/feature/attendList";
import { changeMonth } from "../redux/feature/month";
import { changeCalendarClick } from "../redux/feature/calendarClick";
import { userCountUpdate } from "../redux/feature/userAttendanceCount";
import { userAcId } from "../redux/feature/userAccountId";


import { saveAttendList } from "../module/attendList";
import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import Popup from "./popUp";
import { useNavigate } from "react-router-dom";



function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  
  const reduxState = useSelector((state) => {
    return state;
  });


  const $attListObj = reduxState.$attListObj;
  let $eventAttList = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  for (var key in $attListObj) {
    let tempObj = {};
    tempObj["title"] = $attListObj[key].count;
    tempObj["start"] = key;
    $eventAttList.push(tempObj);
  }


  useEffect(() => {
    /**
     * 서버와 통신 후 session에 남아있는 사용자정보 유무에 따라 페이지가 다르게 이동된다.
     * @returns 메인페이지 혹은 로그인페이지로 이동
     */
    async function getUserInfo() {
      const session = await axios.post(
        process.env.REACT_APP_API_ROOT + "/session"
      );

      if (session.data.success === "ok") {
        dispatch(userAcId(session.data.attendanceUser.accountId));
        // return navigate("/calendar");
      } else{
        return navigate("/");
      }
    }
    getUserInfo();
  }, []);


  useEffect(() => {
    async function fetchData() {
      if( month != ''){
        let attListArray = await saveAttendList(year, month);
        dispatch(changObj(attListArray));
        if (Object.keys(attListArray).length !== 0){
          dispatch(changObj(attListArray));
        }
      }
    }
    
    if( open == false){
      fetchData();
    }

    dispatch(changeMonth({ year: year, month: month }));

    async function getUserAttendanceCount(){
      const session = await axios.get(
        process.env.REACT_APP_API_ROOT + "/atndn/my-attendance-count"
      );

      if(session.data.success === "ok"){
        dispatch(userCountUpdate(session.data.myAttendance))
      } else {
        dispatch(userCountUpdate('error'))
      }

    }
    getUserAttendanceCount()

  }, [month,open]);


  const handleDateClick = (e) => {
    dispatch(changeCalendarClick(true))
    setOpen(true);
    setDate(e.dateStr);
  };

  return (
    <>
      <NavbarTop />
      <NavbarBottom />
      <FullCalendar
        headerToolbar={{
          start:'title',
          center:'',
          end: 'prev next'
        }}
        height={"auto"}
        datesSet={(arg) => {
          let argTitle = arg.view.title.split(" ");
          setYear(argTitle[0].replace("년", ""));
          setMonth(argTitle[1].replace("월", ""));
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends={true}
        eventClick={(info) => {
          let year = info.event.start.getFullYear();
          let month = String(info.event.start.getMonth() + 1).padStart(2, "0");
          let date = String(info.event.start.getDate()).padStart(2, "0");

          let returnDate = `${year}-${month}-${date}`;
          dispatch(changeCalendarClick(true))
          setOpen(true);
          setDate(returnDate);
        }}
        events={$eventAttList}
        titleFormat={function (date) {
          return `${date.date.year}년 ${String(date.date.month + 1).padStart(
            2,
            "0"
          )}월`;
        }}
      />
      <Popup open={open} setOpen={setOpen} date={date}></Popup>
    </>
  );
}

export default CalendarPage;
