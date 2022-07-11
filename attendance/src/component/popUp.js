import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';


function Popup(props){
  const date = props.date
  
  return(
    <Dialog open={props.open}>
      <DialogTitle>타이틀</DialogTitle>
      <DialogContent>
        <DialogContentText>
            여기는 해당날짜 참석자들이 보여집니다.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
          <Button variant="outlined" onClick={()=>{
            axios.post('http://3.36.247.2/atndn/entry',
            {
              attendanceDate: date,
              mealStatus: "N"
            }
            ).then((reponse)=>{console.log(reponse)})
          }}>출석하기</Button>
          <Button variant="outlined" onClick={()=>{
            props.setOpen(false)
          }}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Popup;