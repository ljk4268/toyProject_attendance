//mui
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { blue, pink } from '@mui/material/colors';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

// 장소등록 input창
import * as React from 'react';

//장소 등록시 보이는 mui라이브러리
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PlaceIcon from '@mui/icons-material/Place';




export function showPlaces(i, handleClick, place) {
  return <List key={i} sx={{ background: '#fafafa', pt: 0, mt: 1, borderRadius: '5px' }}>

    <ListItemButton onClick={() => { handleClick(i); } } sx={{ pt: 2 }}>
      <ListItemIcon>
        <PlaceIcon sx={{ color: pink[500] }} />
      </ListItemIcon>
      <ListItemText primary={place.locationName} />
      {place.open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>


    <Collapse in={place.open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItemButton sx={{ pl: 5 }}>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <EmojiPeopleOutlinedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="김익형" />
          <IconButton edge="end" aria-label="delete" color='inherit'>
            <CancelOutlinedIcon />
          </IconButton>
        </ListItemButton>
      </List>
    </Collapse>

  </List>;
}