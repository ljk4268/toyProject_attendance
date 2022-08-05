const handleClick = (i) => {
  let newPlaces = [...places];
  newPlaces[i].open = !newPlaces[i].open
  setPlaces(newPlaces)
};

function placeFunction(i, handleClick, place) {
  return <List key={i}>

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