import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Popup from "./popUp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMonth, changObj } from "../store";
import { saveAttendList } from "../module/attendList";

function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDateClick = (e) => {
    setOpen(true);
    setDate(e.dateStr);
  };

  // redux store에서 state 가져다쓰기
  // redux store를 가져와주는 useSelector()
  let state = useSelector((state) => {
    return state;
  });
  let calendarMonth = state.month.month;
  let calendarYear = state.month.year;
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
      dispatch(changObj(attListArray));
    }
    fetchData();

    dispatch(changeMonth({ year: year, month: month }));
  }, [month]);

  return (
    <>
      <FullCalendar
        datesSet={(arg) => {
          let argTitle = arg.view.title.split(" ");
          setYear(argTitle[0].replace("년", ""));
          setMonth(argTitle[1].replace("월", ""));
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends={true}
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
