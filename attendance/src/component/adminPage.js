import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import MainLogo from "../component/mianLogo";
import {getToday} from ".././module/getToday";
import {attendanceStatus} from ".././module/user";

// mui라이브러리
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useEffect } from "react";
import { dateFnsLocalizer } from "react-big-calendar";


function AdiminPage(){

  let date = new Date();
  const today = getToday().split("-");
  const [todayDate, SetTodayDate] = useState(date);
  const [year, SetYear] = useState(today[0]);
  const [month, SetMonth] = useState(today[1]);
  const [statusRows, SetStatusRows] = useState([]);

  function oneMonthCalculation(num){
  
    let sel_month = num; 
    todayDate.setMonth(todayDate.getMonth() + sel_month ); 
    SetTodayDate(todayDate)
    
    let func_year   = todayDate.getFullYear();
    let func_month   = ('0' + (todayDate.getMonth() +  1 )).slice(-2);

    SetYear(func_year);
    SetMonth(func_month);

  }


  useEffect(()=>{
    async function attendStatusMonth() {
      let attStatus = await attendanceStatus(year, month);
      let attStatusArr = attStatus.data.attendanceList;
      let newStatusRows = [];

      attStatusArr.map( key =>{
        let attStatusObj = {};
        attStatusObj.id = key.accountId;
        attStatusObj.nickname = key.nickname;
        attStatusObj.regDate = key.regDate;
        attStatusObj.attendanceAccount = key.attendanceAccount;
        newStatusRows.push(attStatusObj);
      })

      SetStatusRows(newStatusRows);

    }
      attendStatusMonth();
  },[year, month])



  const columns = [
    { field: 'nickname', headerName: '이름', width: 100 },
    { field: 'regDate', headerName: '가입날짜', type: 'number', width: 120 },
    { field: 'attendanceAccount', headerName: '출석횟수', type: 'number',width: 120 },
    
  ];


  return(
    <>
    <NavbarTop/>
    <NavbarBottom/>
    <MainLogo/>
    <p className="userHi"> 관리자페이지 update.2022.09.01</p>
    <div className="adminArrow">
      <ArrowBackIosIcon onClick={()=>{oneMonthCalculation(-1)}}/>
      <Typography className="month-arrow">{month}월</Typography>
      <ArrowForwardIosIcon onClick={()=>{oneMonthCalculation(+1)}}/>
    </div>
    <div style={{ height: 400, width: '90%', margin: '0 auto', paddingBottom: '20%'}}>
      <DataGrid
        rows={statusRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
    </>
  )
}

export default AdiminPage;