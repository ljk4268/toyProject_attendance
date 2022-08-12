
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
import attendanceTagUi from './partial/attendaceTagUi';


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

  let navigate = useNavigate();
  let date = getToday();
  let [todayAttendanceNames, setTodayAttendanceNames] = useState([1]);
  let [todayPlaces, setTodayPlaces] = useState([]);
  let [notificationMessage, setNotificationMessage] = useState(false);
  let [cancelAlertOpen, setCancelAlertOpen] = useState(false);
  let [placeDeleteOpen, setPlaceDeleteOpen] = useState(false);
  let [deleteLocatinId, setDeleteLocatinId] = useState(0);
  

  let reduxState = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch();

  let user = reduxState.user.nickname;
  let userAccountId = reduxState.userAccountId

  let dataAttendanceFunction = () => {
    getDateAttendance(setTodayAttendanceNames, date)
  }



  // useEffect
  // 로그인한 정보 남아있으면 메인페이지 없으면 다시 로그인 페이지로 돌아가는 공간
  // 창현이한테 이 코드 정확히 무엇을 위한 코드인지 물어보기
  useEffect(()=>{
    async function getUserInfo(){
      
      const session = await axios.post('/session')
      
      if(session.data.success === 'ok') {
        dispatch(userAcId(session.data.attendanceUser.accountId))
        return navigate('/main')

      } 
      // if(session.data.success === 'ok') 가 false면 로그인 페이지로 
      return navigate('/')
    }
    getUserInfo()
  },[])

  // 오늘 날짜의 출석리스트 가져오기 
  // 모듈화 >> state변경함수를 파라미터로 주면서 성공함. 이게 되네?
  useEffect(() => {
    getDateAttendance(setTodayAttendanceNames, date);
    getPlaces(setTodayPlaces);
    
  },[])

  useEffect(()=>{

    if( todayAttendanceNames.length != 0 ){
      setNotificationMessage(false)
    }

    if (todayAttendanceNames == 0){
      setNotificationMessage(true)
    }
  
  },[todayAttendanceNames])



  // mui 함수들
  const handleClick = (i) => {
    let newPlaces = [...todayPlaces];
    newPlaces[i].open = !newPlaces[i].open
    setTodayPlaces(newPlaces)
  };

  const handleClickOpen = () => {
    setCancelAlertOpen(true);
  };

  const handlePlaceDeleteAlert = () => {
    setPlaceDeleteOpen(true);
  };




  let AttendNameList = []
  
  todayAttendanceNames.map((name,i) => {
    if ( name.locationId === null ){
      AttendNameList.push(attendanceTagUi(name,userAccountId,dataAttendanceFunction,cancelAlertOpen,setCancelAlertOpen,dispatch,i))
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
          
          for ( let j = 0; j < todayAttendanceNames.length; j++){
            
            if( place.locationId == todayAttendanceNames[j].locationId){
              userInlocation.push(attendanceTagUi(todayAttendanceNames[j],userAccountId,dataAttendanceFunction,cancelAlertOpen,setCancelAlertOpen,dispatch,j))
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
                    sx={{padding: 0}}
                    onClick={()=>{
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
      
      {
        notificationMessage == true ? <div className="notificationMessage">오늘 등록된 사람이 없습니다.</div> : null
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

  let navigate = useNavigate();

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
