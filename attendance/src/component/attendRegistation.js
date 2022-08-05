import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";


//component
import MainBar from "../component/mainBar";
import MainLogo from "../component/mianLogo";
import PlaceInput from "../component/placeInput";
import { getPlaces } from '../module/places'
import { getToday } from '../module/getToday'

//mui라이브러리
import * as React from 'react';
import Box from '@mui/material/Box';
import { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



function AttendRegistration(){

  const week = ['일','월','화','수','목','금','토']
  
  


  let userInfo = useSelector((state) => {
    return state.user;
  });

  let now = new Date();
  let dayOfWeek = week[now.getDay()];
  let date = getToday();
  let [todayPlaces, setTodayPlaces] = useState([0]);
  let user = userInfo.nickname;
  let [locationId, setLocationId] = useState(null);


  useEffect(() => {
    getPlaces(setTodayPlaces);
  },[])

  function MyFormHelperText() {
    const { focused } = useFormControl() || {};
  
    const helperText = React.useMemo(() => {
      return '오늘 등록된 장소가 없습니다. 오프라인 모임 등록을 원하시는 경우 모임 장소를 등록해주세요.';
    }, [focused]);
  
    return <FormHelperText>{helperText}</FormHelperText>;
  }

  const [alignment, setAlignment] = useState(null);


  const handleChange = (event, newAlignment) => {

    setAlignment(newAlignment);

    if( newAlignment != null ){
      setLocationId(event.target.dataset.id)
    } else {
      setLocationId(null);
    }
  };



  const showPlaces = <div>
    <ToggleButtonGroup
      orientation="vertical"
      value={alignment}
      color="primary"
      exclusive
      onChange={handleChange}
      sx={{width:'100%'}}
    >
      {todayPlaces.map((place, i) => {
        return (

          <ToggleButton 
            value={i}
            key={i}
            data-id={place.locationId}
          >{place.locationName}</ToggleButton>

        );

      })}
    </ToggleButtonGroup>
  </div>;

  const placeInput = <div>
    <PlaceInput setTodayPlaces={setTodayPlaces}/>
    <Box sx={{ width: '90vw' }}><MyFormHelperText /></Box>
  </div>;

  return(
    <>

      <MainBar/>
      <MainLogo/>

      <p className="userHi"> {user} 님, 출석등록을 하시겠습니까? </p>

      <div className="main-bottom">

      <p className="todayList">
        <span className="calendarIcon"><CalendarMonthOutlinedIcon/></span>
        {date} ({dayOfWeek})
      </p> 

        <div className="placeInput">

          <p className="todayList">모임장소! <span className="select">(필수선택아님)</span></p>

          {
            todayPlaces.length == 0 ? placeInput : showPlaces
          }
          

        </div>
        

          
        <p className="todayList">식사여부! <span className="select">(필수선택아님)</span></p> 
      
      </div>

    </>

  )

}

export default AttendRegistration;
