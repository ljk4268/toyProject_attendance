//mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { blue,pink, grey, orange } from '@mui/material/colors';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NoMealsOutlinedIcon from '@mui/icons-material/NoMealsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';


export default function attendanceTagUi(userAttendanceInfo,i) {
  // 해당장소에 등록되는 유저의 경우 paddingLeft를 줘야함. 

  let name = userAttendanceInfo.nickname
  let meal = userAttendanceInfo.mealStatus
  let locationId = userAttendanceInfo.locationId
  
  let mealIconTag = null;
  let paddingLeftValue = 1;

  if ( meal == 'N'  ) {
    mealIconTag = <NoMealsOutlinedIcon sx={{ fontSize: 18, paddingRight: 1, color: grey[300] }}/>
  } else {
    mealIconTag = <RestaurantOutlinedIcon sx={{ fontSize: 18, paddingRight: 1, color: orange[300] }}/>
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

    <ListItemText primary={name}/>
    

    <IconButton edge="end" aria-label="delete" color='inherit'>
      <CancelOutlinedIcon />
    </IconButton>
  </ListItem>
</List>
  
}