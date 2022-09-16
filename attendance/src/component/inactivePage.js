import axios from "axios";

import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import MainLogo from "../component/mianLogo";
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




function InactiveUserPage(){

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

  async function permitActive(_accountId){
    const permitInfo = await axios.post(process.env.REACT_APP_API_ROOT + "/active-account", {
      accountId: _accountId
    });
    if(permitInfo.data.success == 'ok') setCheck(!check)
  }


  useEffect(()=>{
    async function inactiveUsers() {
      let inactiveAll = await axios.get(process.env.REACT_APP_API_ROOT + "/inactive-all");
      let inactiveAllArr = inactiveAll.data.accountInfo
      let newStatusRows = [];
      let activeButton = null;

      inactiveAllArr.map(key =>{
        let attStatusObj = {};
        attStatusObj.accountId = key.accountId;
        attStatusObj.nickname = key.nickname;
        attStatusObj.activeAccount = key.useYn;

        activeButton = <Button variant="outlined"
        onClick={async()=>{permitActive(key.accountId)}}
        >등록</Button>
        attStatusObj.activeAccountRegistration = activeButton
        newStatusRows.push(attStatusObj);
      })

      newStatusRows.sort(function(a, b) {
        return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
      })

      SetStatusRows(newStatusRows)

    }
    inactiveUsers();
  },[check])


  const columns = [
    { 
      id: 'nickname', 
      label: 'Name', 
      minWidth: 50,
      align: 'center' 
    },
    {
      id: 'activeAccount',
      label: '사용자활성화여부',
      minWidth: 80,
      align: 'center',
    },
    {
      id: 'activeAccountRegistration',
      label: '사용자활성화',
      minWidth: 80,
      align: 'center',
    },
  ];


  return(
    <>
    <NavbarTop/>
    <NavbarBottom/>
    <MainLogo/>
    <p className="userHi">비활성화 사용자 목록 페이지!</p>
    <p className="userHi">  </p>
    <p className="userHi">비활성화 사용자들은 시작이반 출석부를 이용하지 못합니다. </p>
    <p className="userHi"><strong>[등록]</strong>버튼을 눌러 사용자 활성화 시키면 이용할 수 있게 됩니다. </p>
    <div className="adminArrow"></div>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.accountId}>
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
    
    </div>
    </>
  )
}

export default InactiveUserPage;