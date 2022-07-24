import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changObj } from './../store'


function Popup(props){
  const date = props.date
  const attendanceList = {};
  
  let state = useSelector((state)=>{ return state.month })
  let state1 = useSelector((state)=>{ return state})
  let calendarMonth = state.month;
  let calendarYear = state.year;
  
  let dispatch = useDispatch()

  return(
    <Dialog open={props.open}>
      <DialogTitle>타이틀</DialogTitle>
      <DialogContent>
        <DialogContentText>
            여기는 해당날짜 참석자들이 보여집니다.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* 출석하기 버튼 눌렀을 때 출석등록함.  27 - 31/*/}
        {/* 비동기 데이터전송과 결과값 받는것을 동기식으로 바꿈 async와 await을 써서.  */}
        {/* 왜 썼냐고? 코드 깔끔하게 할라고 / 여러 비동기식을 보낼때는 이렇게 쓰는게 더 깔끔하다.  */}
          <Button variant="outlined" onClick={ 
          async ()=>{
            const entry = await axios.post('/atndn/entry',
            {
              attendanceDate: date,
              mealStatus: "N"
            })
            // 출석 등록되고 나면 팝업창 닫기.
            props.setOpen(false);
            // 출석이 등록되고 나면 리스트 받기. 
            const list = await axios.get('/atndn/list')

            // 요소의 달과 리덕스 안의 현재 달을 비교 
            // 비교해서 true면 그 날짜는 우리가 써야하는 날짜 
            // 우리가 써야하는 날짜들을 객체안에 넣어둠 
            

            // attList : 데이터에서 받아온 배열  
            let attList = list.data.attendanceList

            // 객체 key : 년/월/일
            // 객체 value : 몇명인지. 
            // '2022-06-25' : 1
            let attListObj = {}

            // attList : 데이터에서 받아온 배열 반복문
            attList.forEach(function(att){
              // 받아온 데이터에서 달만 빼냄 
              let attYear = att.attendanceDate.split('-')[0];
              let attMonth = att.attendanceDate.split('-')[1];

              // 리덕스에 있는 달과 뺴온 달과 비교함 
              // true 
              if (calendarYear == attYear && calendarMonth == attMonth){
                // 이 if문 안에는 '달'로 걸러진 애들만 들어옴 
                // Object.keys(attListObj) = 객체명
                // includes(att.attendanceDate) = key이름이야. 
                // includes는 true 아니면 false
                if (Object.keys(attListObj).includes(att.attendanceDate) == false) {
                  attListObj[att.attendanceDate] = 1;
                } else {
                  attListObj[att.attendanceDate] += 1;
                }
              }
              
            })
            // 리덕스 변수 $attObj에 값 넣어주기 
            dispatch(changObj(attListObj))

          }}>출석하기</Button>
          <Button variant="outlined" onClick={()=>{
            props.setOpen(false)
          }}>취소</Button>
      </DialogActions>
    </Dialog>
  )
}


export default Popup;