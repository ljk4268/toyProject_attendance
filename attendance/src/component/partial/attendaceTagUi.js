//mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { blue, grey, orange } from '@mui/material/colors';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NoMealsOutlinedIcon from '@mui/icons-material/NoMealsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

//함수
import { postAttendanceCancel } from '../../module/user';
import { changePopUpOn } from '../../redux/feature/popUpOn'
import { changeCalendarClick } from '../../redux/feature/calendarClick'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDateAttendance } from '../../module/user'
import { getPlaces } from '../../module/places'



export default function AttendanceTagUi(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reduxState = useSelector((state) => {
    return state;
  });
  const calendarClick = reduxState.calendarClick

  // props로 전달받은 유저정보 변수들
  const name = props.dateAttendanceNames.nickname
  const meal = props.dateAttendanceNames.mealStatus
  const locationId = props.dateAttendanceNames.locationId
  const accountId = props.dateAttendanceNames.accountId
  const attendanceId = props.dateAttendanceNames.attendanceId


  // 아이콘태그 변수들
  let mealIconTag = null;
  let cancelIconTag = null;
  let editIconTag = null;
  let cancelAlert = null;

  // css 변수
  let paddingLeftValue = 1;

  if ( locationId != null ){
    paddingLeftValue = 5;
  }

  // alert창
  const handleClickOpen = () => {
    props.setCancelAlertOpen(true);
  };

  const handleClose = () => {
    props.setCancelAlertOpen(false);
  };



  // 식사버튼
  if ( meal == 'N'  ) {
    mealIconTag = <NoMealsOutlinedIcon sx={{ fontSize: 18, paddingRight: 1, color: grey[300] }}/>
  } else {
    mealIconTag = <RestaurantOutlinedIcon sx={{ fontSize: 18, paddingRight: 1, color: orange[300] }}/>
  }

  // 출석 수정 && 취소버튼 && 취소버튼 누를 때 나오는 알림창
  if ( accountId == props.userAccountId.accountId ){
    // 출석취소버튼
    cancelIconTag = <IconButton edge="end" aria-label="delete" 
    onClick={handleClickOpen}>
    <CancelOutlinedIcon/>
  </IconButton>

    // 출석수정버튼
    editIconTag = <IconButton 
      edge="end" 
      aria-label="edit" 
      onClick={()=>{
        if ( calendarClick ){
          dispatch(changePopUpOn(true));
          dispatch(changeCalendarClick(false));
          navigate('/registration', {state: {clickdate: props.date}})
        } else {
          navigate('/registration', {state: {clickdate: props.date}})
        }
      }}  >
    <EditOutlinedIcon sx={{paddingRight:'10px'}}/>
  </IconButton>

    //출석취소버튼 누를 때 나오는 알림창
    cancelAlert = <Dialog
      open={props.cancelAlertOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          출석등록을 취소하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>아니요</Button>
        <Button 
        onClick={async()=>{
          await postAttendanceCancel(attendanceId);
          await getPlaces(props.setDatePlaces, props.date);
          await getDateAttendance(props.setDateAttendanceNames, props.date);
          handleClose();
        }}
        autoFocus>
          네
        </Button>
      </DialogActions>
      </Dialog>

  }

  return (
  <List component="div" disablePadding key={props.j}>
    <ListItem sx={{pl: paddingLeftValue}}>
      
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
        <EmojiPeopleOutlinedIcon />
        </Avatar>
      </ListItemAvatar>

      {mealIconTag}

      <ListItemText primary={name} />
      
      {editIconTag}
      {cancelIconTag}
      {cancelAlert}

    </ListItem>
  </List>
  
  )
  
}