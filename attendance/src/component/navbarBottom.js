import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';




function NavbarBottom() {

  let navigate = useNavigate();
  
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
        <AppBar position="fixed"  sx={{  top:'auto', bottom: 0,  }} className="navbar">
          <Toolbar sx={{  display:'flex', justifyContent:'space-evenly'  }}>

            <IconButton color="inherit" aria-label="open drawer" onClick={()=>{navigate('/main')}}>
              <HomeOutlinedIcon sx={{ fontSize: 30 }}/>
            </IconButton>

            <StyledFab color="inherit" aria-label="add" 
              style={{ backgroundColor: '#f8eb76', color: '#fbfbf9' }}
              onClick={()=>{navigate('/registration')}}
            >
              <AddIcon sx={{ fontSize: 38 }}/>
            </StyledFab>

            <Box sx={{ flexGrow: 0.4 }} />

            <IconButton color="inherit" onClick={()=>{navigate('/calendar')}}>
              <CalendarMonthOutlinedIcon sx={{ fontSize: 30 }}/>
            </IconButton>

          </Toolbar>
        </AppBar>

  );


}


export default NavbarBottom;