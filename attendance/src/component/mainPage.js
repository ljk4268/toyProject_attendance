
//component
import MainBar from "../component/mainBar";
import MainLogo from "../component/mianLogo";
import PlaceInput from "../component/placeInput";

import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { postPlaces, getPlaces } from '../module/places'
import { getToday } from '../module/getToday'
import { getTodayAttendance } from '../module/user'
import { useDispatch, useSelector } from "react-redux";


//mui
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { blue, pink } from '@mui/material/colors';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


//장소 등록시 보이는 장소리스트 함수
import { showPlaces } from '../module/showPlaces';




function MainPage() {

  let navigate = useNavigate();
  let date = getToday();
  let [todayAttendanceNames, setTodayAttendanceNames] = useState([]);
  let [todayPlaces, setTodayPlaces] = useState([]);
  
  let userInfo = useSelector((state) => {
    return state.user;
  });

  let user = userInfo.nickname;


  // useEffect
  // 로그인한 정보 남아있으면 메인페이지 없으면 다시 로그인 페이지로 돌아가는 공간
  // 창현이한테 이 코드 정확히 무엇을 위한 코드인지 물어보기
  useEffect(()=>{
    async function getUserInfo(){
      
      const session = await axios.post('/session')
      
      if(session.data.success === 'ok') {

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
    getTodayAttendance(setTodayAttendanceNames)
    getPlaces(setTodayPlaces);
  },[])


  // mui 함수들
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const handleClick = (i) => {
    let newPlaces = [...todayPlaces];
    newPlaces[i].open = !newPlaces[i].open
    setTodayPlaces(newPlaces)
  };


// JSX내용 리팩토링 하기 
// 리팩토링 : 코드를 좀더 깔끔하게 만들기 위해 유지보수하는것 (=재작업)
  const AttendNameList =  <List sx={{ pt: 1 }}>
    {todayAttendanceNames.map((name, i) => (
      <ListItem key={i}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
            <EmojiPeopleOutlinedIcon />

          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name.nickname} />
        <IconButton edge="end" aria-label="delete" color='inherit'>
          <CancelOutlinedIcon />
        </IconButton>
      </ListItem>
    ))}
  </List>


  return(
    <>
      <MainBar/>
      <MainLogo/>

      <p className="userHi"> {user} 님, 반가워요!! </p>

      <div className="main-bottom">

        <p className="todayList">오늘 공부하는 사람!</p>
        
        <PlaceInput setTodayPlaces={setTodayPlaces} />

        <Demo>
          {/* 장소등록 되었을 때 보이는 UI */}
          {/* // 첫 for문 : 장소 데이터를 서버에서 받아옴 
          // 두번째 for문 : 날짜에 대한 출석자를 서버에서 받아옴 
          // 첫번째 for문의 장소와 두번째 for문의 그 사람이 저장한 장소를 비교함 
          // 비교해서 맞으면 그 장소 아래에 넣으면 됨.  */}

          {
            todayPlaces.map(function(place, i){
              return(
                showPlaces(i, handleClick, place)
              )
            })
          }
          

          {/* 해당날짜 출석등록자들 보이는 UI */}
          { AttendNameList }
            
          </Demo>
      </div>
      
    </>
  
  
  )

};

export default MainPage;
