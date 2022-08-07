import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';



function NavbarTop() {
  
  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  return (      
      <React.Fragment>
        <Box sx={{ flexGrow: 1, paddingBottom:'25%' }}>

        {/* 상단 navbar */}
          <AppBar position="fixed">

            <Toolbar style={{ backgroundColor: "#fbfbf9", color: "#000" }}>

              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" color="inherit" align="center" component="div" sx={{ flexGrow: 1 }} >
              시작이 반
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                
                  <InsertEmoticonOutlinedIcon />
                
              </IconButton>

              {/* <Button color="inherit">Login</Button> */}

            </Toolbar>

          </AppBar>

        </Box> 
    </React.Fragment>
  );


}


export default NavbarTop;