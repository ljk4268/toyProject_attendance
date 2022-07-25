import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changObj } from "./../store";
import { saveAttendList } from "../module/attendList";

function Popup(props) {
  const date = props.date;

  let state = useSelector((state) => {
    return state.month;
  });
  let calendarMonth = state.month;
  let calendarYear = state.year;

  let dispatch = useDispatch();

  return (
    <Dialog open={props.open}>
      <DialogTitle>타이틀</DialogTitle>
      <DialogContent>
        <DialogContentText>
          여기는 해당날짜 참석자들이 보여집니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* 출석하기 버튼 눌렀을 때 출석등록함.  27 - 31/*/}
        {/* 비동기 데이터전송과 결과값 받는것을 동기식으로 바꿈 async와 await을 써서.  */}
        {/* 왜 썼냐고? 코드 깔끔하게 할라고 / 여러 비동기식을 보낼때는 이렇게 쓰는게 더 깔끔하다.  */}
        <Button
          variant="outlined"
          onClick={async () => {
            const entry = await axios.post("/atndn/entry", {
              attendanceDate: date,
              mealStatus: "N",
            });
            // 출석 등록되고 나면 팝업창 닫기.
            props.setOpen(false);

            // 출석이 등록되고 나면 리스트 받기.
            let attListObj = await saveAttendList(calendarYear, calendarMonth);

            dispatch(changObj(attListObj));
          }}
        >
          출석하기
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.setOpen(false);
          }}
        >
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
