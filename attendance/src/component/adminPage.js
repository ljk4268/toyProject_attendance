import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import MainLogo from "../component/mianLogo";
import {getToday} from ".././module/getToday";
import {attendanceStatus} from ".././module/user";
import { useState } from "react";
import { useEffect } from "react";

// mui라이브러리
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
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




function AdiminPage(){

  let date = new Date();
  const today = getToday().split("-");
  const [todayDate, SetTodayDate] = useState(date);
  const [year, SetYear] = useState(today[0]);
  const [month, SetMonth] = useState(today[1]);
  const [statusRows, SetStatusRows] = useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        newStatusRows.sort(function(a,b){
          return a.attendanceAccount - b.attendanceAccount;
        })
      })

      SetStatusRows(newStatusRows);

    }
      attendStatusMonth();
  },[year, month])


  const columns = [
    { id: 'nickname', label: 'Name', minWidth: 50 },
    {
      id: 'regDate',
      label: '가입날짜',
      minWidth: 80,
      align: 'center',
    },
    {
      id: 'attendanceAccount',
      label: '출석횟수',
      minWidth: 80,
      align: 'center',
    },
    {
      id: 'activeAccount',
      label: '사용자활성화여부',
      minWidth: 80,
      align: 'center',
    },
    {
      id: 'activeAccountRegistration',
      label: '사용자활성화등록',
      minWidth: 80,
      align: 'center',
    },
  ];



  return(
    <>
    <NavbarTop/>
    <NavbarBottom/>
    <MainLogo/>
    <p className="userHi"> 관리자페이지 update.2022.09.08</p>
    <div className="adminArrow">
      <ArrowBackIosIcon onClick={()=>{oneMonthCalculation(-1)}}/>
      <Typography className="month-arrow">{month}월</Typography>
      <ArrowForwardIosIcon onClick={()=>{oneMonthCalculation(+1)}}/>
    </div>
    <div style={{ height: 400, width: '99%', margin: '0 auto', paddingBottom: '15%'}}>
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={statusRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    </>
  )
}

export default AdiminPage;