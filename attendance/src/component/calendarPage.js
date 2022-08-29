import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { changObj } from "../redux/feature/attendList";
import { changeMonth } from "../redux/feature/month";
import { changeCalendarClick } from "../redux/feature/calendarClick";
import { changeAttendCheck } from "../redux/feature/attendCheck";
import { changeEditMode } from "../redux/feature/editMode";
import { userCountUpdate } from "../redux/feature/userAttendanceCount";

import { saveAttendList } from "../module/attendList";
import { getToday } from "../module/getToday";
import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import Popup from "./popUp";



function CalendarPage() {
  const todayDate = getToday();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  
  const reduxState = useSelector((state) => {
    return state;
  });


  const $attListObj = reduxState.$attListObj;
  const userAccountId = reduxState.userAccountId;
  const userAttendanceCount = reduxState.userAttendanceCount;
  let $eventAttList = [];
  const dispatch = useDispatch();

  for (var key in $attListObj) {
    let tempObj = {};
    tempObj["title"] = $attListObj[key].count;
    tempObj["start"] = key;
    $eventAttList.push(tempObj);
  }

  useEffect(() => {
    async function fetchData() {
      if( month != ''){
        let attListArray = await saveAttendList(year, month);
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

    async function checkAttendance(){
      let check = false;

      const lists = await axios.post(process.env.REACT_APP_API_ROOT + '/atndn/list-on-date',{
        attendanceDate: todayDate
      });
      let todayAttendanceLists = lists.data.attendanceList;

      todayAttendanceLists.forEach(function (name) {
        if (name.accountId == userAccountId.accountId) {
          check = true;
        }
      });

      if (check) {
        dispatch(changeAttendCheck(true));
        dispatch(changeEditMode(true));
      } else {
        dispatch(changeAttendCheck(false));
        dispatch(changeEditMode(false));
      }

    }
    checkAttendance()

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
