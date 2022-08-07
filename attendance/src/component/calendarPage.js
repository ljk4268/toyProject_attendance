import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Popup from "./popUp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changObj } from "../redux/feature/attendList";
import { changeMonth } from "../redux/feature/month";
import { saveAttendList } from "../module/attendList";
import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";

function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  
  let state = useSelector((state) => {
    return state;
  });

  let $attListObj = state.$attListObj;
  let $eventAttList = [];
  let dispatch = useDispatch();


  for (var key in $attListObj) {
    let tempObj = {};
    tempObj["title"] = $attListObj[key].count;
    tempObj["start"] = key;
    $eventAttList.push(tempObj);
  }

  useEffect(() => {
    async function fetchData() {
      let attListArray = await saveAttendList(year, month);
      if (Object.keys(attListArray).length !== 0){
        dispatch(changObj(attListArray));
      }
    }
    fetchData();

    dispatch(changeMonth({ year: year, month: month }));
  }, [month]);

  const handleDateClick = (e) => {
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
