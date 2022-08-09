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


//함수
import { postAttendanceCancel } from '../../module/user';


export default function attendanceTagUi(userAttendanceInfo,userAccountId,dataAttendanceFunction,i) {
  // 해당장소에 등록되는 유저의 경우 paddingLeft를 줘야함. 

  // 유저정보 변수들
  let name = userAttendanceInfo.nickname
  let meal = userAttendanceInfo.mealStatus
  let locationId = userAttendanceInfo.locationId
  let accountId = userAttendanceInfo.accountId
  let attendanceId = userAttendanceInfo.attendanceId

  // 아이콘태그 변수들
  let mealIconTag = null;
  let cancelIconTag = null;
  let editIconTag = null;

  // css 변수
  let paddingLeftValue = 1;

  // alert창


  // 상황에 따라 보여질 UI들을 위한 분기
  if ( meal == 'N'  ) {
    mealIconTag = <NoMealsOutlinedIcon sx={{ fontSize: 18, paddingRight: 1, color: grey[300] }}/>
  } else {
    mealIconTag = <RestaurantOutlinedIcon sx={{ fontSize: 18, paddingRight: 1, color: orange[300] }}/>
  }

  if ( accountId == userAccountId.accountId ){

    // 출석취소버틑ㄴ
    cancelIconTag = <IconButton edge="end" aria-label="delete" 
    onClick={async()=>{
      // 둘다 비동기 함수인데 순서 지키게 하려고 
      // await로 동기화 시켜버림
      await postAttendanceCancel(attendanceId);
      await dataAttendanceFunction();
    }}>
    <CancelOutlinedIcon/>
  </IconButton>

// 출석수정버튼
    editIconTag = <IconButton edge="end" aria-label="edit">
    <EditOutlinedIcon 
      sx={{paddingRight:'10px'}}
      onClick={()=>{window.location.href="/registration"}}  
    />
  </IconButton>

  }

  if ( locationId != null ){
    paddingLeftValue = 5;
  }




  return <List component="div" disablePadding key={i}>
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

  </ListItem>
</List>
  
}