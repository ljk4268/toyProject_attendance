import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signOut } from '../module/user'


//mui라이브러리
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { blue, pink } from "@mui/material/colors";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import Avatar from '@mui/material/Avatar';
import CheckIcon from '@mui/icons-material/Check';


function NavbarTop() {
  const navigate = useNavigate();
  const reduxState = useSelector((state) => {
    return state;
  });
  const user = reduxState.user.nickname;
  const userAdminStatus = reduxState.user.adminStatus;
  const userAttendanceCount = reduxState.userAttendanceCount[0];
  const [anchorEl, setAnchorEl] = useState(null);
  const alertOpen = Boolean(anchorEl);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let offlineIcon = null;
  if (userAttendanceCount.offlineCount >= 2) {
    offlineIcon =  <SentimentVerySatisfiedIcon sx={{ color: blue[400], verticalAlign:'middle' }}/>
  } else {
    offlineIcon =  <SentimentVeryDissatisfiedIcon sx={{ color: pink[400], verticalAlign:'middle' }}/>
  }

  let onlineIcon = null;
  if (userAttendanceCount.onlineCount >= 1) {
    onlineIcon =  <SentimentVerySatisfiedIcon sx={{ color: blue[400], verticalAlign:'middle' }}/>
  } else {
    onlineIcon =  <SentimentVeryDissatisfiedIcon sx={{ color: pink[400], verticalAlign:'middle' }}/>
  }

  const offlineScore = userAttendanceCount.offlineCount * 10;
  const onlineScore = userAttendanceCount.onlineCount * 2;
  const totalScore = offlineScore + onlineScore;
  let scoreIcon = <SentimentVeryDissatisfiedIcon sx={{ color: pink[400], marginRight:'0.4em' }}/>;
  if ( totalScore >= 20 ){
    scoreIcon = <SentimentVerySatisfiedIcon sx={{ color: blue[400], marginRight:'0.4em' }}/>
  }



  let alertMenu = <Menu
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
        <Typography variant="inherit">
          {user}님, 4주간 출석점수 알려드립니다!
        </Typography>
      </MenuItem>
      <MenuItem>
        {scoreIcon}
        <Typography align='right'>
          <strong>총 {totalScore}점 / 20점</strong>
        </Typography>
      </MenuItem>
      <MenuItem>
        <CheckIcon sx={{ color: blue[400] }} />
        <Typography variant="inherit">
          오프라인(10점) : {userAttendanceCount.offlineCount}회 / 총 {offlineScore}점 
        </Typography>
      </MenuItem>
      <MenuItem>
        <CheckIcon sx={{ color: blue[400] }} />
        <Typography variant="inherit">
          혼자(2점) : {userAttendanceCount.onlineCount}회 / 총 {onlineScore}점 
        </Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={()=>{
        handleClickOpen();
      }}>
        <ListItemIcon>
          <NotificationsActiveIcon fontSize="small" sx={{ color: blue[400] }}/>
        </ListItemIcon>
        공지사항
      </MenuItem>

      { 
        userAdminStatus == 'Y' ? <MenuItem onClick={() => {
          navigate("/adminpage");
        }}>
          <ListItemIcon>
            <BadgeOutlinedIcon fontSize="small" sx={{ color: blue[400] }}/>
          </ListItemIcon>
          관리자페이지
        </MenuItem> : null 
      }
      

      <MenuItem onClick={()=>{signOut(navigate)}}>
        <ListItemIcon>
          <Logout fontSize="small" sx={{ color: blue[400] }}/>
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
    
  


  return (
    <>      
      <Box sx={{ flexGrow: 1, paddingBottom:'25%'}}>

      {/* 상단 navbar */}
        <AppBar  position="fixed" className='navbar' style ={{paddingRight: "0px"}}>
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
                id = "smile-button"
              >
                
                <Avatar sx={{ bgcolor: pink[100], color: pink[400] }}>
                  <ChatOutlinedIcon />
                </Avatar>
                
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box> 
      {alertMenu}

      {/* 공지사항 알림창 */}
      <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"공지사항은 준비중 ! (찡긋)"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClickClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      </div>
  </>
  );


}


export default NavbarTop;