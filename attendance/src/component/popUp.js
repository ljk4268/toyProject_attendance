import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

// 함수
import { getPlaces, deletePlace } from '../module/places'
import { getDateAttendance } from '../module/user'
import AttendanceTagUi from './partial/attendaceTagUi';
import { useNavigate } from "react-router-dom";
import { changePopUpOn } from '../redux/feature/popUpOn'
import { changeCalendarClick } from '../redux/feature/calendarClick'

// mui 라이브러리 함수
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';




function Popup(props) {

  const reduxState = useSelector((state) => {
    return state;
  });
  const userAccountId = reduxState.userAccountId;
  const userAdminStatus = reduxState.user.adminStatus;

  const navigate = useNavigate();
  const dispatch = useDispatch();

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


  /**
   * 
   * i : 몇번째에 등록된 장소인지 알기위한 파라미터
   * 토글버튼 기능 활성화 함수 
   * datePlaces[i].open이 false로 되어있는데 true로 변경되면서 장소 클릭하면 해당 모임장소에 등록한 출석리스트가 보임 
   */
  const handleClick = (i) => {
    let newPlaces = [...datePlaces];
    newPlaces[i].open = !newPlaces[i].open
    setDatePlaces(newPlaces)
  };

  // 사용자에게 보여지는 '출석하기' 버튼 관련 
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

  // 혼자할게요 선택한 출석리스트 
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

  // 등록된 모임장소 및 해당 모임장소 선택한 출석리스트
  let showPlace = datePlaces.map(function(place,i){
    let userInlocation = [];

    for ( let j = 0; j < dateAttendanceNames.length; j++){
      if( place.locationId == dateAttendanceNames[j].locationId){
        userInlocation.push(<AttendanceTagUi 
          dateAttendanceNames={dateAttendanceNames[j]} 
          userAccountId={userAccountId}
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
      <List key={i} sx={{ background: 'rgb(255, 254, 211)', pt: 0, mt: 1, borderRadius: '5px' }}>

        <ListItemButton onClick={() => { handleClick(i); }} sx={{ pt: 2 }}>
            <PlaceIcon sx={{ color: blue[400] }} />
            <ListItemText primary={place.locationName} sx={{ fontWeight:'bold', textAlign: 'left' }} />

          {
            place.accountId == userAccountId.accountId || userAdminStatus == 'Y'? <IconButton edge="start" aria-label="delete" 
            sx={{marginRight:'10px'}}
            onClick={(event)=>{
              event.stopPropagation()
              let locationId = place.locationId
              setDeleteLocatinId(locationId)
              setPlaceDeleteOpen(true)
            }}
            >
            <CancelOutlinedIcon/>
          </IconButton> : null

          }
          {place.open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={place.open} timeout="auto" unmountOnExit>
          {userInlocation}
        </Collapse>

      </List>
    )
  })

  return (
    <>
      <Dialog open={props.open}>

        <DialogTitle sx={{textAlign: 'center'}}>
          {showMonth}월 {showDay}일 공부하는 사람 누구누구?
        </DialogTitle>

         {/* 출석등록한 사람들 리스트 */}
        <DialogContent>
          <DialogContentText component="div">

            {/* 장소리스트 */}
            {showPlace}

            {/* 해당날짜 출석등록자들 보이는 UI */}
            {AttendNameList}

            {/* 모임장소 삭제 버튼을 누른경우 보여지는 창 */}
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

// 장소삭제버튼 누르면 나오는 컴포넌트
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
