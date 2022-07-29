import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changObj, changeNameArray } from "./../store";
import { saveAttendList } from "../module/attendList";
import { useEffect, useState } from "react";

// 테스트중


function Popup(props) {

  const date = props.date;

  let state = useSelector((state) => {
    return state.month;
  });
  let $attListObj = useSelector((state) => {
    return state.$attListObj;
  });
  let dispatch = useDispatch();

  let calendarMonth = state.month;
  let calendarYear = state.year;

  let [names, setNames] = useState([]);


  // Cannot update a component (`CalendarPage`) while rendering a different component 을 만남. if문으로만 작성했을 떄. 

  useEffect(()=>{
    if ($attListObj[date] !== undefined) {
      let namesArray = ($attListObj[date].name)
      let newNames = [...names]
      newNames = namesArray
      setNames(newNames)
    } else {
      let newNames = [...names]
      newNames = []
      setNames(newNames)
    }
  }, [date])


  useEffect(()=>{
    dispatch(changeNameArray(names))
  }, [names])

  return (
    <Dialog open={props.open}>
      <DialogTitle> 누가누가 참석했나~ 😏 </DialogTitle>
      <DialogContent>
        <DialogContentText component="div">
          <List sx={{ pt: 0 }} >
            {names.map((name,i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <EmojiPeopleOutlinedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{justifyContent: 'center'}}>
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
              let attListObj = await saveAttendList(
                calendarYear,
                calendarMonth
              );

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
