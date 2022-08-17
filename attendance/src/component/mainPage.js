
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

//component 및 함수
import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import MainLogo from "../component/mianLogo";
import { getPlaces, deletePlace } from '../module/places'
import { getToday } from '../module/getToday'
import { getDateAttendance } from '../module/user'
import { userAcId } from '../redux/feature/userAccountId'
import AttendanceTagUi from './partial/attendaceTagUi';


//mui
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


//함수
function MainPage() {

  let date = getToday();
  let [dateAttendanceNames, setTodayAttendanceNames] = useState([1]);
  let [todayPlaces, setTodayPlaces] = useState([]);
  let [notificationMessage, setNotificationMessage] = useState(false);
  let [cancelAlertOpen, setCancelAlertOpen] = useState(false);
  let [placeDeleteOpen, setPlaceDeleteOpen] = useState(false);
  let [deleteLocatinId, setDeleteLocatinId] = useState(0);
  

  let reduxState = useSelector((state) => {
    return state;
  });
  
  
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let user = reduxState.user.nickname;
  let userAccountId = reduxState.userAccountId;


  useEffect(()=>{
    async function getUserInfo(){
      
      const session = await axios.post(process.env.REACT_APP_API_ROOT + '/session')
      
      if(session.data.success === 'ok') {
        dispatch(userAcId(session.data.attendanceUser.accountId))
        return navigate('/main')

      } 
      return navigate('/')
    }
    getUserInfo()
  },[])

  // 오늘 날짜의 출석리스트 가져오기 
  // 모듈화 >> state변경함수를 파라미터로 주면서 성공함. 이게 되네?
  useEffect(() => {
    getDateAttendance(setTodayAttendanceNames, date);
    getPlaces(setTodayPlaces, date);
    
  },[])

// 출석 등록한 사람이 없을 때 서버에서 빈배열을 보내줌. 
// 서버에서 빈배열을 받은거랑 내가 초기화 했을 때 빈배열인거랑 헷갈리지 않으려고 
// 1이라는 요소가 들어간 배열로 초기화를 해둠. 

  useEffect(()=>{

    if( dateAttendanceNames.length != 0 ){
      setNotificationMessage(false)
    }

    if (dateAttendanceNames == 0){
      setNotificationMessage(true)
    }
  
  },[dateAttendanceNames])



  // mui 함수들
  const handleClick = (i) => {
    let newPlaces = [...todayPlaces];
    newPlaces[i].open = !newPlaces[i].open
    setTodayPlaces(newPlaces)
  };

  const handlePlaceDeleteAlert = () => {
    setPlaceDeleteOpen(true);
  };




  let AttendNameList = []
  
  dateAttendanceNames.map((name,i) => {
    if ( name.locationId === null ){
      AttendNameList.push(<AttendanceTagUi 
        dateAttendanceNames={name} 
        userAccountId={userAccountId}
        cancelAlertOpen={cancelAlertOpen}
        setCancelAlertOpen={setCancelAlertOpen}
        setTodayAttendanceNames={setTodayAttendanceNames}
        date={date}
        j={i}
        key={i}
        />)
    }
  })

  


  return(
    <>
      <NavbarTop/>
      <NavbarBottom/>
      <MainLogo/>

      <p className="userHi"> {user} 님, 반가워요!! </p>

      <div className="main-bottom">

        <p className="todayList">오늘 공부하는 사람!</p>


      {
      // 장소는 map함수로 하나씩 반복되고 있다. 
      // 유저정보를 모두 꺼내는 for문으로 반복을 하면 유저정보도 한번씩 돌아감. 
      // 그 장소아이디랑 유저가 속한 장소아이디랑 비교해서 
      // 같으면 그 장소에 속하게끔 구현할 수 있다. 
        todayPlaces.map(function(place, i){
          // 해당장소 클릭한 유저 모음
          let userInlocation = [];
          
          for ( let j = 0; j < dateAttendanceNames.length; j++){
            
            if( place.locationId == dateAttendanceNames[j].locationId){
              userInlocation.push(<AttendanceTagUi 
                dateAttendanceNames={dateAttendanceNames[j]} 
                userAccountId={userAccountId}
                cancelAlertOpen={cancelAlertOpen}
                setCancelAlertOpen={setCancelAlertOpen}
                setTodayAttendanceNames={setTodayAttendanceNames}
                date={date}
                j={j}
                key={j}
                />)
            }

          }

          return(
            <List key={i} sx={{ background: '#fafafa', pt: 0, mt: 1, borderRadius: '5px' }}>

              <ListItemButton onClick={() => { handleClick(i); } } sx={{ pt: 2 }}>
                <ListItemIcon>
                  <PlaceIcon sx={{ color: blue[400] }} />
                </ListItemIcon>
                <ListItemText primary={place.locationName} sx={{ fontWeight:'bold' }}/>

                  {
                    place.accountId == userAccountId.accountId ? <IconButton edge="start" aria-label="delete" 
                    sx={{paddingRight:'10px'}}
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
                

                {place.open ? <ExpandLess sx={{marginLeft: '15px'}}/> : <ExpandMore sx={{marginLeft: '15px'}}/>}
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
        notificationMessage == true ? <div className="notificationMessage">오늘 등록한 사람이 없습니다.</div> : null
      }

      {
        placeDeleteOpen == true ? <PlaceDeleteAlert 
        placeDeleteOpen={placeDeleteOpen}
        setPlaceDeleteOpen={setPlaceDeleteOpen}
        deleteLocatinId={deleteLocatinId}
        setTodayPlaces={setTodayPlaces}
        /> : null
      }

      </div>
    </>
  )

};

export default MainPage;

function PlaceDeleteAlert(props){

  let locationId = props.deleteLocatinId

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
          let deletePlaceResult = await deletePlace(locationId);
          handlePlaceDeleteAlertClose();
          getPlaces(props.setTodayPlaces);
        }}
        autoFocus>
          네
        </Button>
      </DialogActions>
      </Dialog>
  )
}
