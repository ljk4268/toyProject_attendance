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
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changObj } from "../redux/feature/attendList";
import { changeNameArray } from "../redux/feature/attendanceNames";
import { saveAttendList } from "../module/attendList";
import { useEffect, useState } from "react";

// 함수
import { getPlaces, deletePlace } from '../module/places'
import { getDateAttendance } from '../module/user'
import attendanceTagUi from './partial/attendaceTagUi';



function Popup(props) {

  

  let state = useSelector((state) => {
    return state.month;
  });
  let $attListObj = useSelector((state) => {
    return state.$attListObj;
  });
  let userAccountId = useSelector((state) => {
    return state.userAccountId;
  });


  let dispatch = useDispatch();

  const date = props.date;
  let calendarMonth = state.month;
  let calendarYear = state.year;
  let [dateAttendanceNames, setDateAttendanceNames] = useState([1]);
  let [datePlaces, setDatePlaces] = useState([]);
  let [cancelAlertOpen, setCancelAlertOpen] = useState(false);




  // 해당날짜 출석인원 및 모임장소 가지고오기
  useEffect(()=>{
    if ( date != ''){
    getPlaces(setDatePlaces, date)
    getDateAttendance(setDateAttendanceNames, date)
  }
  },[props.open])


  let dataAttendanceFunction = () => {
    getDateAttendance(setTodayAttendanceNames, date)
  }

  const handleClick = (i) => {
    let newPlaces = [...datePlaces];
    newPlaces[i].open = !newPlaces[i].open
    setDatePlaces(newPlaces)
  };


  let AttendNameList = [];

  dateAttendanceNames.map((name,i) => {
    if ( name.locationId === null ){
      AttendNameList.push(attendanceTagUi(name,userAccountId,dataAttendanceFunction,cancelAlertOpen,setCancelAlertOpen,dispatch,i))
    }
  })

  let atndnButton = <>
        <Button variant="outlined">
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
      </>

  dateAttendanceNames.map((name,i) =>{
    
    if ( name.accountId == userAccountId.accountId ){

      atndnButton = 
      <>
        <Button variant="outlined">
              수정하기
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                props.setOpen(false);
              }}
            >
              취소
            </Button>
      </>

    } 
  })

  return (
    <>
      <Dialog open={props.open}>
        <DialogTitle>자기계발하는 사람 누구누구?!</DialogTitle>


         {/* 출석등록한 사람들 리스트 */}
        <DialogContent>
          <DialogContentText component="div">

            {/* 장소리스트 */}
            {

              datePlaces.map(function(place,i){
                let userInlocation = [];

                for ( let j = 0; j < dateAttendanceNames.length; j++){
                  if( place.locationId == dateAttendanceNames[j].locationId){
                    userInlocation.push(attendanceTagUi(dateAttendanceNames[j],userAccountId,dataAttendanceFunction,cancelAlertOpen,setCancelAlertOpen,dispatch,j))
                  }
                }

                return(
                  <List key={i} sx={{ background: '#fafafa', pt: 0, mt: 1, borderRadius: '5px' }}>

                    <ListItemButton onClick={() => { handleClick(i); }} sx={{ pt: 2 }}>
                      <ListItemIcon>
                        <PlaceIcon sx={{ color: blue[400] }} />
                      </ListItemIcon>
                      <ListItemText primary={place.locationName} sx={{ fontWeight:'bold' }}/>
                        

                      {place.open ? <ExpandLess sx={{paddingLeft: '25px'}}/> : <ExpandMore sx={{paddingLeft: '25px'}}/>}
                    </ListItemButton>

                    <Collapse in={place.open} timeout="auto" unmountOnExit>
                    
                      {userInlocation}
                      
                    </Collapse>
                  </List>
                )

              })

            }

            {/* 해당날짜 출석등록자들 보이는 UI */}
            {AttendNameList}


          </DialogContentText>
        </DialogContent>



        <DialogActions style={{justifyContent: 'center'}}>
        
            {atndnButton}

        </DialogActions>
      </Dialog>

    </>
  );
}

export default Popup;
