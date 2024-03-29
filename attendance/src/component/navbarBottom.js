import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let _date = getToday();

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });
  
  

  return (
        // {/* 하단 navbar */}
        <AppBar position="fixed"  sx={{  top:'auto', bottom: 0 }} className="navbar" style ={{paddingRight: "0px"}}>
          <Toolbar sx={{  display:'flex', justifyContent:'space-evenly',backgroundColor: '#fff'  }}>

            <IconButton aria-label="open drawer" onClick={()=>{navigate('/main')}}>
              <HomeOutlinedIcon sx={{ fontSize: 32, color: grey[600] }}/>
            </IconButton>

            <StyledFab color="inherit" aria-label="add" 
              style={{ backgroundColor: '#f8eb76', color: '#fbfbf9' }}
              onClick={()=>{
                dispatch(changePopUpOn(false));
                navigate('/registration', {state: {clickdate: _date}}) }}
            >
              <AddIcon sx={{ fontSize: 38 }}/>
            </StyledFab>

            <Box sx={{ flexGrow: 0.4 }} />

            <IconButton onClick={()=>{navigate('/calendar')}}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 32, color: grey[600] }}/>
            </IconButton>

          </Toolbar>
        </AppBar>

  );


}


export default NavbarBottom;