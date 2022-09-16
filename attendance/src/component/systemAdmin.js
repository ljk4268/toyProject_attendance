import axios from "axios";

import NavbarTop from "../component/navbarTop";
import MainLogo from "../component/mianLogo";
import InactiveUserPage from './inactivePage';


// mui 라이브러리
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SystemAdiminPage(){

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [statusRows, setStatusRows] = useState([]);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function permitAdmin(_accountId){
    const permitInfo = await axios.post(process.env.REACT_APP_API_ROOT + "/permit-admin", {
      accountId: _accountId
    });
    if(permitInfo.data.success == 'ok') setCheck(!check)
  }

  useEffect(()=>{
    async function activeAll() {
      const activeAll = await axios.get(process.env.REACT_APP_API_ROOT + "/active-all");
      const accountInfo = activeAll.data.accountInfo;

      let newStatusRows = [];
      
      accountInfo.map(key => {
        let accountInfoObj = {};
        let adminRegistrationButton = null;
        let adminRegistrationButtonText = null;

        accountInfoObj.id = key.accountId;
        accountInfoObj.name = key.nickname;
        accountInfoObj.email = key.email;
        accountInfoObj.adminStatus = key.adminStatus;
        adminRegistrationButtonText = key.adminStatus == 'Y' ? '해제' : '등록'
        adminRegistrationButton = <Button variant="outlined"
        onClick={async()=>{permitAdmin(key.accountId)}}
        >{adminRegistrationButtonText}</Button>
        accountInfoObj.adminRegistration = adminRegistrationButton;
        newStatusRows.push(accountInfoObj);

        newStatusRows.sort(function(a, b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        })

      })
      setStatusRows(newStatusRows);

    }
    activeAll();

  },[check])

  

  const columns = [
    { id: 'name', label: 'Name', minWidth: 50, align: 'center' },
    {
      id: 'adminStatus',
      label: '운영진여부',
      minWidth: 80,
      align: 'center',
    },
    {
      id: 'adminRegistration',
      label: '운영진등록',
      minWidth: 80,
      align: 'center',
    },
  ];
  

  return (
  <>
    <NavbarTop/>
    <MainLogo/>
    <p className="userHi"> 시스템관리자페이지! </p>
    <p className="userHi"> 운영진 등록이 가능합니다. </p>
    <div className="adminArrow"></div>
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
export default SystemAdiminPage;