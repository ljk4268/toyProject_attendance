import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';




function NavbarBottom() {
  
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
        // {/* css fixed padding 구글검색해서 찾음  */}
        <AppBar position="fixed"  sx={{  top:'auto', bottom: 0,  }} className="navbar">
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

  );


}


export default NavbarBottom;