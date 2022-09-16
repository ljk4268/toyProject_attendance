import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { blue, yellow } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// 함수
import { getPlaces, deletePlace } from '../module/places'
import { getDateAttendance } from '../module/user'
import AttendanceTagUi from './partial/attendaceTagUi';
import { useNavigate } from "react-router-dom";
import { changePopUpOn } from '../redux/feature/popUpOn'
import { changeCalendarClick } from '../redux/feature/calendarClick'




function Popup(props) {

  let reduxState = useSelector((state) => {
    return state;
  });

  let userAccountId = reduxState.userAccountId;

  let navigate = useNavigate();

  let dispatch = useDispatch();

  const date = props.date;
  const dayArr = date.split('-');
  const showMonth = Number(dayArr[1]);
  const showDay = Number(dayArr[2]);

  const [dateAttendanceNames, setDateAttendanceNames] = useState([1]);
  const [datePlaces, setDatePlaces] = useState([]);
  const [cancelAlertOpen, setCancelAlertOpen] = useState(false);
  const [placeDeleteOpen, setPlaceDeleteOpen] = useState(false);
  const [deleteLocatinId, setDeleteLocatinId] = useState(0);


 
  // 해당날짜 출석인원 및 모임장소 가지고오기
  useEffect(()=>{
    if ( date != ''){
    getPlaces(setDatePlaces, date)
    getDateAttendance(setDateAttendanceNames, date, userAccountId)
    }
  },[props.open])


  let dataAttendanceFunction = () => {
    getDateAttendance(setDateAttendanceNames, date, userAccountId)
  }

  const handleClick = (i) => {
    let newPlaces = [...datePlaces];
    newPlaces[i].open = !newPlaces[i].open
    setDatePlaces(newPlaces)
  };

  const handlePlaceDeleteAlert = () => {
    setPlaceDeleteOpen(true);
  };


  let AttendNameList = [];

  dateAttendanceNames.map((name,i) => {
    if ( name.locationId === null ){
      AttendNameList.push(<AttendanceTagUi 
        dateAttendanceNames={name} 
        userAccountId={userAccountId}
        cancelAlertOpen={cancelAlertOpen}
        setCancelAlertOpen={setCancelAlertOpen}
        setDateAttendanceNames={setDateAttendanceNames}
        setDatePlaces={setDatePlaces}
        date={date}
        j={i}
        key={i}
        />)
    }
  })

  let atndnButton = <>
        <Button variant="outlined"
          onClick={() => {
            dispatch(changeCalendarClick(false));
            dispatch(changePopUpOn(true));
            navigate('/registration', {state: {clickdate: date}} );
            props.setOpen(false);
          }}
        >
              출석하기
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(changeCalendarClick(false));
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
        <Button variant="outlined"
          onClick={() => {
            dispatch(changePopUpOn(true));
            dispatch(changeCalendarClick(false));
            navigate('/registration', {state: {clickdate: date}} );
            props.setOpen(false);
          }}
        >
              수정하기
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(changeCalendarClick(false));
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
        <DialogTitle sx={{textAlign: 'center'}}>{showMonth}월 {showDay}일 공부하는 사람 누구누구?</DialogTitle>


         {/* 출석등록한 사람들 리스트 */}
        <DialogContent>
          <DialogContentText component="div">

            {/* 장소리스트 */}
            {

              datePlaces.map(function(place,i){
                let userInlocation = [];

                for ( let j = 0; j < dateAttendanceNames.length; j++){
                  if( place.locationId == dateAttendanceNames[j].locationId){
                    userInlocation.push(<AttendanceTagUi 
                      dateAttendanceNames={dateAttendanceNames[j]} 
                      userAccountId={userAccountId}
                      dataAttendanceFunction={dataAttendanceFunction}
                      cancelAlertOpen={cancelAlertOpen}
                      setCancelAlertOpen={setCancelAlertOpen}
                      setDateAttendanceNames={setDateAttendanceNames}
                      setDatePlaces={setDatePlaces}
                      date={date}
                      j={j}
                      key={j}
                      />)
                  }
                }

                return(
                  <List key={i} sx={{ background: yellow[100], pt: 0, mt: 1, borderRadius: '5px' }}>

                    <ListItemButton onClick={() => { handleClick(i); }} sx={{ pt: 2 }}>
                      {/* <ListItemIcon> */}
                        <PlaceIcon sx={{ color: blue[400] }} />
                      {/* </ListItemIcon> */}
                      <ListItemText primary={place.locationName} sx={{ fontWeight:'bold', textAlign: 'left' }} />

                      {
                        place.accountId == userAccountId.accountId ? <IconButton edge="start" aria-label="delete" 
                        sx={{marginRight:'10px'}}
                        onClick={(event)=>{
                          event.stopPropagation()
                          let locationId = place.locationId
                          setDeleteLocatinId(locationId)
                          handlePlaceDeleteAlert();
                        }}
                        >
                        <CancelOutlinedIcon/>
                      </IconButton> 

                      :

                      null

                      }
                        

                      {place.open ? <ExpandLess /> : <ExpandMore />}
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

            {
              placeDeleteOpen == true ? <PlaceDeleteAlert 
              placeDeleteOpen={placeDeleteOpen}
              setPlaceDeleteOpen={setPlaceDeleteOpen}
              deleteLocatinId={deleteLocatinId}
              setDatePlaces={setDatePlaces}
              setDateAttendanceNames={setDateAttendanceNames}
              date={date}
              userAccountId={userAccountId}
              /> : null
            }


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

function PlaceDeleteAlert(props){

  let locationId = props.deleteLocatinId
  let userAccountId = props.userAccountId

  const handlePlaceDeleteAlertClose = () => {
    props.setPlaceDeleteOpen(false);
  };

  return (
    <Dialog
      open={props.placeDeleteOpen}
      onClose={handlePlaceDeleteAlertClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          해당 장소를 삭제하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePlaceDeleteAlertClose}>아니요</Button>
        <Button 
        onClick={async()=>{
          await deletePlace(locationId);
          await getPlaces(props.setDatePlaces, props.date);
          await getDateAttendance(props.setDateAttendanceNames, props.date, userAccountId);
          handlePlaceDeleteAlertClose();
        }}
        autoFocus>
          네
        </Button>
      </DialogActions>
      </Dialog>
  )
}
