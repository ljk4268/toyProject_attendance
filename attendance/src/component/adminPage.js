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
  const [moveNum, setMoveNum] = useState(0);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  /**
   * 서버에 year과 month를 전달하기 위해 날짜 변수를 계산하여 지정하는 함수.
   * @param {num} +1 or -1 을 받아 다음달 혹은 이전달을 계산한다.  
   */
  function moveNumChange(num){
  
    // let sel_month = num; 
    // todayDate.setMonth(todayDate.getMonth() + sel_month ); 
    // SetTodayDate(todayDate)

    // let func_year   = todayDate.getFullYear();
    // let func_month   = ('0' + (todayDate.getMonth() +  1 )).slice(-2);

    // SetYear(func_year);
    // SetMonth(func_month);

    setMoveNum(moveNum+num)


  }

  /**
   * 
   * @param {_accountId} 사용자의 accountId를 서버에 전달하여 관리자가 맞는지 확인한다.
   */
  async function permitActive(_accountId){
    const permitInfo = await axios.post(process.env.REACT_APP_API_ROOT + "/active-account", {
      accountId: _accountId
    });
    if(permitInfo.data.success == 'ok') setCheck(!check)
  }

  const excelDownload = () =>{
    axios({
      method: 'POST',
      url: process.env.REACT_APP_API_ROOT + "/atndn/attendance-excel",
      responseType: 'blob',
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        moveNum
      }
    })
    .then( response =>{
      console.log(response)
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Study.xlsx');
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
    })

  }

  useEffect(()=>{
    async function attendStatusMonth() {
      let attStatus = await attendanceStatus(year, month);
      let attStatusArr = attStatus.data.attendanceList;

      let activeAll = await axios.get(process.env.REACT_APP_API_ROOT + "/active-all");
      let activeAllArr = activeAll.data.accountInfo;

      let newStatusRows = [];
      let activeButton = null;


      attStatusArr.map( key =>{
        let attStatusObj = {};
        attStatusObj.id = key.accountId;
        attStatusObj.nickname = key.nickname;
        attStatusObj.regDate = key.regDate;
        attStatusObj.offlineCount = key.offlineCount;
        attStatusObj.onlineCount = key.onlineCount;
        activeButton = <Button variant="outlined"
        onClick={async()=>{permitActive(key.accountId)}}
        >강퇴</Button>
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

  useEffect(()=>{
    const getDatePeriod = async () => {
      try {
        const response = await axios.post(process.env.REACT_APP_API_ROOT + "/atndn/attendance-date-period",
        {
          moveNum
        })
        return response.data.attendanceDatePeriod;
      } catch(err) {
        throw err;
      }
    }
    getDatePeriod()
    .then( res => {
      setStartDate(res[0])
      setEndDate(res[7])
    })
  },[moveNum])

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

  let datePeriod = '';
  if ( startDate != undefined && endDate != undefined ){
    datePeriod = `${startDate} ~ ${endDate}`
  }


  return(
    <>
    <NavbarTop/>
    <NavbarBottom/>
    <MainLogo/>
    <p className="userHi">관리자페이지!</p>
    <p className="userHi">오프라인 및 온라인 출석횟수를 확인하실 수 있습니다.</p>
    <p className='userHi'>
      <Button 
        variant="outlined"
        onClick={excelDownload}
      >출석체크 엑셀 다운로드</Button>
    </p>
    <div className="adminArrow">
      <ArrowBackIosIcon onClick={()=>{moveNumChange(-1)}}/>
      <Typography>{datePeriod}</Typography>
      <ArrowForwardIosIcon onClick={()=>{moveNumChange(+1)}}/>
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