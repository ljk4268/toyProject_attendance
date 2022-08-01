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



function MainBar() {
  
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
        <Box sx={{ flexGrow: 1, paddingBottom:'15%' }}>

        {/* 상단 navbar */}
          <AppBar position="static">

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

        {/* 하단 navbar */}
        {/* css fixed padding 구글검색해서 찾음  */}
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0,  }} className="topAppBar">
          <Toolbar >

            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>

            <StyledFab color="inherit" aria-label="add" 
            style={{ backgroundColor: '#f8eb76', color: '#fbfbf9' }}>
              <AddIcon sx={{ fontSize: 38 }} />
            </StyledFab>

            <Box sx={{ flexGrow: 1 }} />

            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>

            <IconButton color="inherit">
              <MoreIcon />
            </IconButton>

          </Toolbar>
        </AppBar>

    </React.Fragment>
  );


}


export default MainBar;