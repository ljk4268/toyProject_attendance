import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import Fade from '@mui/material/Fade';
import { blue } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';




function NavbarTop() {

  const navigate = useNavigate();
  const reduxState = useSelector((state) => {
    return state;
  });

  const user = reduxState.user.nickname;
  const userAttendanceCount = reduxState.userAttendanceCount;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sideBarAnchorEl, setSideBarAnchorEl] = React.useState(null);
  const alertOpen = Boolean(anchorEl);
  const sideBarOpen = Boolean(sideBarAnchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sideBarHandleClick = (event) => {
    setSideBarAnchorEl(event.currentTarget);
  };
  const sideBarHandleClose = () => {
    setSideBarAnchorEl(null);
  };

  const alertMenu = <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={alertOpen}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <Typography variant="inherit">{user}님, 이번달 출석횟수는 {userAttendanceCount}번 입니다.</Typography>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <NotificationsActiveIcon fontSize="small" sx={{ color: blue[400] }}/>
        </ListItemIcon>
        공지사항
      </MenuItem>
      <MenuItem onClick={() => {
        navigate("/adminpage");
      }}>
        <ListItemIcon>
          <BadgeOutlinedIcon fontSize="small" sx={{ color: blue[400] }}/>
        </ListItemIcon>
        관리자페이지
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Logout fontSize="small" sx={{ color: blue[400] }}/>
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>

const sideBarMenu = <Menu
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={sideBarAnchorEl}
      open={sideBarOpen}
      onClose={sideBarHandleClose}
      TransitionComponent={Fade}
      
      >
      <MenuItem onClick={sideBarHandleClose}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">공지사항</Typography>
      </MenuItem>
      <MenuItem onClick={sideBarHandleClose}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">관리자페이지</Typography>
      </MenuItem>
    </Menu>

  return (
    <>      
      <Box sx={{ flexGrow: 1, paddingBottom:'25%'}}>

      {/* 상단 navbar */}
        <AppBar  position="fixed" className='navbar'>
          <Toolbar style={{ backgroundColor: "#fbfbf9", color: "#000" }} >
            <Typography color="inherit" align="center" component="div" sx={{ flexGrow: 1, fontSize: '17px', fontWeight: '500' }} >
            시작이 반
            </Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="large"
                aria-label="account of current user"
                aria-controls={alertOpen ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={alertOpen ? 'true' : undefined}
                color="inherit"
                sx={{ ml: -4 }}
              >
                
                  <InsertEmoticonOutlinedIcon />
                
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box> 
      {alertMenu}
  </>
  );


}


export default NavbarTop;