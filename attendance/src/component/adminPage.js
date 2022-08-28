import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import MainLogo from "../component/mianLogo";

// mui라이브러리
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';





function AdiminPage(){

  const columns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'attendanceCount', headerName: '출석횟수', width: 150 }
  ];

  const rows = [
    { id: 1, attendanceCount: '1', name: '김익형'},
    { id: 2, attendanceCount: '1', name: '오창현'},
    { id: 3, attendanceCount: '1', name: '이자경'},
    { id: 4, attendanceCount: '1', name: '김승훈'},
    { id: 5, attendanceCount: '1', name: '정예성'},
    { id: 6, attendanceCount: '1', name: '윤지혜'},
    { id: 7, attendanceCount: '1', name: '윤경택'},
    { id: 8, attendanceCount: '1', name: '류선길'},
    { id: 9, attendanceCount: '1', name: '장효진'},
    { id: 10, attendanceCount: '1', name: '모지혜'}
    
  ];

  return(
    <>
    <NavbarTop/>
    <NavbarBottom/>
    <MainLogo/>
    <p className="userHi"> 관리자페이지 뚜딱뚜딱 만드는 중!</p>
    <div className="adminArrow">
      <ArrowBackIosIcon/>
      <Typography className="month-arrow">8월</Typography>
      <ArrowForwardIosIcon/>
    </div>
    <div style={{ height: 450, width: '90%', margin: '0 auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
    </>
  )
}

export default AdiminPage;