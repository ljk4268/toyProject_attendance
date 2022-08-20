import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { grey } from '@mui/material/colors';
import { getToday } from '../module/getToday';
import { changePopUpOn } from '../redux/feature/popUpOn'






function NavbarBottom() {

  let dispatch = useDispatch();
  let navigate = useNavigate();
  let reduxState = useSelector((state) => {
    return state;
  });
  let attendCheck = reduxState.attendCheck;


  let _date = getToday();


  let plusButton = null;;

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  if ( attendCheck ) {
    plusButton = null;
  } else {
    plusButton = <StyledFab color="inherit" aria-label="add" 
    style={{ backgroundColor: '#f8eb76', color: '#fbfbf9' }}
    onClick={()=>{
      dispatch(changePopUpOn(false));
      navigate('/registration', {state: {clickdate: _date}}) }}
  >
    <AddIcon sx={{ fontSize: 38 }}/>
  </StyledFab>
  }
  
  

  return (      
        // {/* 하단 navbar */}
        <AppBar position="fixed"  sx={{  top:'auto', bottom: 0,  }} className="navbar">
          <Toolbar sx={{  display:'flex', justifyContent:'space-evenly',backgroundColor: '#fff'  }}>

            <IconButton aria-label="open drawer" onClick={()=>{navigate('/main')}}>
              <HomeOutlinedIcon sx={{ fontSize: 30, color: grey[600] }}/>
            </IconButton>

            {plusButton}

            <Box sx={{ flexGrow: 0.4 }} />

            <IconButton onClick={()=>{navigate('/calendar')}}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 30, color: grey[600] }}/>
            </IconButton>

          </Toolbar>
        </AppBar>

  );


}


export default NavbarBottom;