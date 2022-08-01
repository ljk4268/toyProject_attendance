
import MainBar from "../component/mainBar";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

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

// 장소등록 input창
import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';

//장소 등록시 보이는 mui라이브러리
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';




function MainPage() {

  let navigate = useNavigate();
  let [userName, setUserName] = useState('')
  let date = getToday();
  let [todayAttendanceNames, setTodayAttendanceNames] = useState([]);
  let [places, setPlaces] = useState([{
      id: 0,
      place: '야탑 라리쉐뜨',
      open: false,
      official: 'N'
    },
    {
      id: 0,
      place: '미금 제니스',
      open: false,
      official: 'N'
    }
  ]);


  // useEffect
  // 로그인한 사용자 정보 가져오기 
  useEffect(()=>{
    async function getUserInfo(){
      
      const session = await axios.post('/session')
      
      

      if(session.data.success === 'ok') {

        let $nickname = session.data.attendanceUser.nickname;

        setUserName($nickname)

        return navigate('/main')

      } 
      // if(session.data.success === 'ok') 가 false면 로그인 페이지로 
      return navigate('/')
    }
    getUserInfo()
  },[])

  // 오늘 날짜의 출석리스트 가져오기 
  useEffect(() => {
    async function getTodayAttendance() {
      const lists = await axios.post('/atndn/list-on-date',{
        attendanceDate: date
      });

      let todayAttendanceLists = lists.data.attendanceList
      let newArray = []

      todayAttendanceLists.forEach((element) => {
        newArray.push({
          nickname : element.nickname,
          attendanceId: element.attendanceId,
          locationName: element.locationName,
          locationId: element.locationId,
          mealStatus: element.mealStatus
        }) 
        
        setTodayAttendanceNames(newArray)
      });
    }
    getTodayAttendance();
  },[])


  // 함수들
  // mui 함수들
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};
  
    const helperText = React.useMemo(() => {
      if (focused) {
        return 'This field is being focused';
      }
  
      return '정모인 경우 체크박스를 클릭해주세요.';
    }, [focused]);
  
    return <FormHelperText>{helperText}</FormHelperText>;
  }

  function getToday(){
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (1 + date.getMonth())).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
  }

  

  const handleClick = (i) => {
    let newPlaces = [...places];
    newPlaces[i].open = !newPlaces[i].open
    setPlaces(newPlaces)
  };


  const addPlace = () => {
    let todayPlace = document.getElementById('places').value;
    let newPlace = [...places];
    newPlace.push({id: 0, place: `${todayPlace}`, open: false, official: 'N' });
    setPlaces(newPlace);
  }

  return(
    <>
      <MainBar/>
      <div className="main-top">
        <div>
          <div className="greeting">Well Begun is</div>
          <div className="greeting2">Half Done !</div>
        </div>
      </div>
      <p className="userHi"> {userName} 님, 반가워요!! </p>
      <div className="main-bottom">

        <p className="todayList">오늘 공부하는 사람!</p>

        <Box component="form" noValidate autoComplete="off"
          sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
        >
          <FormControl sx={{ width: '70vw'}}>
            <OutlinedInput placeholder="모임 장소를 입력해주세요." id="places"/>
          </FormControl>
          <Button 
            variant="outlined" 
            onClick={addPlace}
          >등록</Button>
        </Box>
        

        <Demo>
          {/* 장소등록 되었을 때 보이는 UI */}
          {
          // 첫 for문 : 장소 데이터를 서버에서 받아옴 
          // 두번째 for문 : 날짜에 대한 출석자를 서버에서 받아옴 
          // 첫번째 for문의 장소와 두번째 for문의 그 사람이 저장한 장소를 비교함 
          // 비교해서 맞으면 그 장소 아래에 넣으면 됨.   
            places.map(function(place, i){
              return(
              <List key={i} >

                  <ListItemButton onClick={()=>{handleClick(i)}} sx={{ pt: 2 }} >
                    <ListItemIcon>
                      <PlaceIcon sx={{ color: pink[500] }}/>
                    </ListItemIcon>
                    <ListItemText primary={place.place} />
                    {place.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>


                  <Collapse in={place.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding >
                      <ListItemButton sx={{ pl: 5 }}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                              <EmojiPeopleOutlinedIcon />
                            </Avatar>
                          </ListItemAvatar>
                        <ListItemText primary="김익형" />
                        <IconButton edge="end" aria-label="delete" color='inherit'>
                            <CancelOutlinedIcon />
                          </IconButton>
                      </ListItemButton>
                    </List>
                  </Collapse>

                </List>
              )
            })
          
          }
          

          {/* 해당날짜 출석등록자들 보이는 UI */}
          <List sx={{ pt: 1 }} >
              {todayAttendanceNames.map((name,i) => (
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
            
          </Demo>
      </div>
      
    </>
  
  
  )

};

export default MainPage;