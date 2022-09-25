import axios from "axios";

import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import MainLogo from "../component/mianLogo";
import {getToday} from ".././module/getToday";
import {attendanceStatus} from ".././module/user";
import { useState } from "react";
import { useEffect } from "react";

// mui라이브러리
import * as React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";




function AdiminPage(){

  let date = new Date();
  const navigate = useNavigate()

  const today = getToday().split("-");
  const [todayDate, SetTodayDate] = useState(date);
  const [year, SetYear] = useState(today[0]);
  const [month, SetMonth] = useState(today[1]);
  const [check, setCheck] = useState(false);
  const [statusRows, SetStatusRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  function oneMonthCalculation(num){
  
    let sel_month = num; 
    todayDate.setMonth(todayDate.getMonth() + sel_month ); 
    SetTodayDate(todayDate)
    
    let func_year   = todayDate.getFullYear();
    let func_month   = ('0' + (todayDate.getMonth() +  1 )).slice(-2);

    SetYear(func_year);
    SetMonth(func_month);

  }

  async function permitActive(_accountId){
    const permitInfo = await axios.post(process.env.REACT_APP_API_ROOT + "/active-account", {
      accountId: _accountId
    });
    if(permitInfo.data.success == 'ok') setCheck(!check)
  }


  useEffect(()=>{
    async function attendStatusMonth() {
      let attStatus = await attendanceStatus(year, month);
      let attStatusArr = attStatus.data.attendanceList;

      let activeAll = await axios.get(process.env.REACT_APP_API_ROOT + "/active-all");
      let activeAllArr = activeAll.data.accountInfo;
      let newStatusRows = [];
      let activeButton = null;
      let activeButtonText = null;


      attStatusArr.map( key =>{
        let attStatusObj = {};
        attStatusObj.id = key.accountId;
        attStatusObj.nickname = key.nickname;
        attStatusObj.regDate = key.regDate;
        attStatusObj.offlineCount = key.offlineCount;
        attStatusObj.onlineCount = key.onlineCount;
        activeButtonText = key.adminStatus == 'Y' ? '등록' : '강퇴'
        activeButton = <Button variant="outlined"
        onClick={async()=>{permitActive(key.accountId)}}
        >{activeButtonText}</Button>
        attStatusObj.activeAccountRegistration = activeButton
        
        activeAllArr.map( activekey =>{
          if(activekey.accountId == attStatusObj.id){
            attStatusObj.activeAccount = activekey.useYn
          }
        })

        newStatusRows.push(attStatusObj);
      })

      SetStatusRows(newStatusRows);

    }
      attendStatusMonth();
  },[year, month, check])


  const columns = [
    { id: 'nickname', label: 'Name', minWidth: 30 },
    {
      id: 'offlineCount',
      label: '오프라인',
      minWidth: 60,
      align: 'center',
    },
    {
      id: 'onlineCount',
      label: '온라인',
      minWidth: 60,
      align: 'center',
    },
    {
      id: 'activeAccountRegistration',
      label: '사용자강퇴',
      minWidth: 80,
      align: 'center',
    },
  ];


  return(
    <>
    <NavbarTop/>
    <NavbarBottom/>
    <MainLogo/>
    <p className="userHi">관리자페이지!</p>
    <p className="userHi">오프라인 및 온라인 출석횟수를 확인하실 수 있습니다.</p>
    <div className="adminArrow">
      <ArrowBackIosIcon onClick={()=>{oneMonthCalculation(-1)}}/>
      <Typography className="month-arrow">{month}월</Typography>
      <ArrowForwardIosIcon onClick={()=>{oneMonthCalculation(+1)}}/>
    </div>
    <div style={{height: 500, width: '99%', margin: '0 auto', paddingBottom: '25%'}}>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {statusRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[50, 100]}
        component="div"
        count={statusRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <div className="inactive-container">
      <Button 
      variant="contained" 
      fullWidth
      onClick={()=>{navigate('/inactive-user-page')}}
      >비활성 사용자 목록 보러가기</Button>
    </div>
    
    </div>
    </>
  )
}

export default AdiminPage;