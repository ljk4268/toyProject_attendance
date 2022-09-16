import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//component 및 함수
import NavbarTop from "../component/navbarTop";
import NavbarBottom from "../component/navbarBottom";
import MainLogo from "../component/mianLogo";
import { getPlaces, deletePlace } from "../module/places";
import { getToday } from "../module/getToday";
import { getDateAttendance } from "../module/user";
import { userAcId } from "../redux/feature/userAccountId";
import { userDate } from "../redux/feature/user";
import AttendanceTagUi from "./partial/attendaceTagUi";
import { userCountUpdate } from "../redux/feature/userAttendanceCount";

//mui
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { blue,pink, yellow } from "@mui/material/colors";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PlaceIcon from "@mui/icons-material/Place";
import IconButton from "@mui/material/IconButton";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';

//함수
function MainPage() {
  const date = getToday();
  const [dateAttendanceNames, setDateAttendanceNames] = useState([1]);
  const [datePlaces, setDatePlaces] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(false);
  const [cancelAlertOpen, setCancelAlertOpen] = useState(false);
  const [placeDeleteOpen, setPlaceDeleteOpen] = useState(false);
  const [deleteLocatinId, setDeleteLocatinId] = useState(0);
  const [nicknameEditopen, setNicknameEditOpen] = useState(false);

  const handleClickOpen = () => {
    setNicknameEditOpen(true);
  };

  const handleClose = () => {
    setNicknameEditOpen(false);
  };

  let reduxState = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let user = reduxState.user.nickname;
  let userAccountId = reduxState.userAccountId;

  useEffect(() => {
    /**
     * 서버와 통신 후 session에 남아있는 사용자정보 유무에 따라 페이지가 다르게 이동된다.
     * @returns 메인페이지 혹은 로그인페이지로 이동
     */
    async function getUserInfo() {
      const session = await axios.post(
        process.env.REACT_APP_API_ROOT + "/session"
      );
      if (session.data.success === "ok") {
        dispatch(userAcId(session.data.attendanceUser.accountId));
        dispatch(userDate({
          kakaoId: session.data.attendanceUser.kakaoId,
          nickname: session.data.attendanceUser.nickname,
          adminStatus: session.data.attendanceUser.adminStatus,
          accountId: session.data.attendanceUser.accountId,
        }));
        return navigate("/main");
      }
      return navigate("/");
    }
    getUserInfo();
  }, []);

  // 오늘 날짜의 출석리스트 가져오기
  useEffect(() => {
    getDateAttendance(setDateAttendanceNames, date );
    getPlaces(setDatePlaces, date);
  }, []);

  // 등록을 한 직후 상태값을 변경하면 그떄 한 번만 변경이 수행됨.
  // 하지만 서버에 있는 자신을 포함한 데이터가 존재하면 언제나 변경을 수행할 수 있음.
  // 리액트의 생명주기가 끝났다고 생각되면 리덕스 state도 같이 초기화가 됨.
  useEffect(() => {

    if (dateAttendanceNames.length != 0) {
      setNotificationMessage(false);
    }

    if (dateAttendanceNames == 0) {
      setNotificationMessage(true);
    }

    async function getUserAttendanceCount(){
      const session = await axios.get(
        process.env.REACT_APP_API_ROOT + "/atndn/my-attendance-count"
      );

      if(session.data.success === "ok"){
        dispatch(userCountUpdate(session.data.myAttendance))
      } else {
        dispatch(userCountUpdate('error'))
      }

    }
    getUserAttendanceCount()
    
  }, [dateAttendanceNames]);

  // 출석 등록한 사람이 없을 때 서버에서 빈배열을 보내줌.
  // 서버에서 빈배열을 받은거랑 내가 초기화 했을 때 빈배열인거랑 헷갈리지 않으려고
  // 1이라는 요소가 들어간 배열로 초기화를 해둠.

  // useEffect(() => {
  //   if (dateAttendanceNames.length != 0) {
  //     setNotificationMessage(false);
  //   }

  //   if (dateAttendanceNames == 0) {
  //     setNotificationMessage(true);
  //   }
  // }, [dateAttendanceNames]);

  // mui 함수들
  /**
   * 등록된장소의 해당 토글버튼을 누르면 해당장소의 open 값이 변경되면서 모임장소에 출석등록한 사람들의 리스트가 보이고 안보이고가 결정된다.
   * @param  i 어떤 장소가 클릭되었는지 확인하기 위함 
   */
  const handleClick = (i) => {
    let newPlaces = [...datePlaces];
    newPlaces[i].open = !newPlaces[i].open;
    setDatePlaces(newPlaces);
  };

  /**
   * 등록된 장소를 삭제하려는 경우 알림메세지가 나오도록 만들어주는 함수.
   */
  const handlePlaceDeleteAlert = () => {
    setPlaceDeleteOpen(true);
  };

  
  let AttendNameList = [];

  dateAttendanceNames.map((name, i) => {
    if (name.locationId === null) {
      AttendNameList.push(
        <AttendanceTagUi
          dateAttendanceNames={name}
          userAccountId={userAccountId}
          cancelAlertOpen={cancelAlertOpen}
          setCancelAlertOpen={setCancelAlertOpen}
          setDateAttendanceNames={setDateAttendanceNames}
          setDatePlaces={setDatePlaces}
          date={date}
          j={i}
          key={i}
        />
      );
    }
  });
  return (
    <>
      <NavbarTop />
      <NavbarBottom />
      <MainLogo />

      <p className="userHi">{user}님 <AutoFixHighIcon
      fontSize="small"
      sx={{ color: pink[400] }}
      onClick={()=>{handleClickOpen()}}
      ></AutoFixHighIcon></p>
      <p className="userHi2">반가워요!!</p>

      <div className="main-bottom">
        <p className="todayList">오늘 공부하는 사람!</p>

        {
          // 장소는 map함수로 하나씩 반복되고 있다.
          // 유저정보를 모두 꺼내는 for문으로 반복을 하면 유저정보도 한번씩 돌아감.
          // 그 장소아이디랑 유저가 속한 장소아이디랑 비교해서
          // 같으면 그 장소에 속하게끔 구현할 수 있다.
          datePlaces.map(function (place, i) {
            // 해당장소 클릭한 유저 모음
            let userInlocation = [];

            for (let j = 0; j < dateAttendanceNames.length; j++) {
              if (place.locationId == dateAttendanceNames[j].locationId) {
                userInlocation.push(
                  <AttendanceTagUi
                    dateAttendanceNames={dateAttendanceNames[j]}
                    userAccountId={userAccountId}
                    cancelAlertOpen={cancelAlertOpen}
                    setCancelAlertOpen={setCancelAlertOpen}
                    setDateAttendanceNames={setDateAttendanceNames}
                    setDatePlaces={setDatePlaces}
                    date={date}
                    j={j}
                    key={j}
                  />
                );
              }
            }

            return (
              <List
                key={i}
                sx={{
                  background: 'rgb(255, 254, 211)',
                  pt: 0,
                  mt: 1,
                  borderRadius: "5px",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    handleClick(i);
                  }}
                  sx={{ pt: 2 }}
                >
                  <ListItemIcon>
                    <PlaceIcon sx={{ color: blue[400] }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={place.locationName}
                    sx={{ fontWeight: "bold" }}
                  />

                  {place.accountId == userAccountId.accountId ? (
                    <IconButton
                      edge="start"
                      aria-label="delete"
                      sx={{ paddingRight: "10px" }}
                      onClick={(event) => {
                        event.stopPropagation();
                        let locationId = place.locationId;
                        setDeleteLocatinId(locationId);
                        handlePlaceDeleteAlert();
                      }}
                    >
                      <CancelOutlinedIcon />
                    </IconButton>
                  ) : null}

                  {place.open ? (
                    <ExpandLess sx={{ marginLeft: "15px" }} />
                  ) : (
                    <ExpandMore sx={{ marginLeft: "15px" }} />
                  )}
                </ListItemButton>

                <Collapse in={place.open} timeout="auto" unmountOnExit>
                  {userInlocation}
                </Collapse>
              </List>
            );
          })
        }

        {/* 해당날짜 출석등록자들 보이는 UI */}
        {AttendNameList}

        {notificationMessage == true ? (
          <div className="notificationMessage">
            오늘 등록한 사람이 없습니다.
          </div>
        ) : null}

        {placeDeleteOpen == true ? (
          <PlaceDeleteAlert
            placeDeleteOpen={placeDeleteOpen}
            setPlaceDeleteOpen={setPlaceDeleteOpen}
            deleteLocatinId={deleteLocatinId}
            setDatePlaces={setDatePlaces}
            setDateAttendanceNames={setDateAttendanceNames}
            userAccountId={userAccountId}
            date={date}
          />
        ) : null}

        {
          nicknameEditopen == true ? (
          <NicknameEditAlert
            nicknameEditopen = {nicknameEditopen}
            setNicknameEditOpen = {setNicknameEditOpen}
            handleClickOpen={handleClickOpen}
            handleClose = {handleClose}
            user={user}
            userAccountId={userAccountId}
            dispatch={dispatch}
            navigate={navigate}
            setDateAttendanceNames={setDateAttendanceNames}
            date={date}
          />  
          ) : null}
      </div>
    </>
  );
}

export default MainPage;

function PlaceDeleteAlert(props) {
  let locationId = props.deleteLocatinId;
  let userAccountId = props.userAccountId;

  const handlePlaceDeleteAlertClose = () => {
    props.setPlaceDeleteOpen(false);
  };

  return (
    <Dialog
      open={props.placeDeleteOpen}
      onClose={handlePlaceDeleteAlertClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          해당 장소를 삭제하시겠습니까?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePlaceDeleteAlertClose}>아니요</Button>
        <Button
          onClick={async () => {
            await deletePlace(locationId);
            await getPlaces(props.setDatePlaces, props.date);
            await getDateAttendance(
              props.setDateAttendanceNames,
              props.date,
              userAccountId
            );
            handlePlaceDeleteAlertClose();
          }}
          autoFocus
        >
          네
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function NicknameEditAlert(props){
  let label = "20자이내로 설정해주세요!"
  return(
    <div>
      <Dialog open={props.nicknameEditopen} onClose={props.handleClose}>
        <DialogTitle>닉네임 변경</DialogTitle>
        <DialogContent>
          <DialogContentText>
            닉네임은 본인이름으로 설정해주시기 바랍니다.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nicknameinput"
            label={label}
            type="email"
            fullWidth
            variant="standard"
            autoComplete="off"
            // autoComplete는 알게된거니까 따로 정리하기
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>취소</Button>
          <Button onClick={async()=>{
            let edit_nickname = document.getElementById('nicknameinput').value
            let profile = await axios.post(
              process.env.REACT_APP_API_ROOT + "/profile",
              {
                accountId: props.userAccountId.accountId,
                nickname: edit_nickname
              }
            );
            if(profile.data.success == 'ok'){
              props.dispatch(userDate({
                kakaoId: profile.data.account.kakaoId,
                nickname: profile.data.account.nickname,
                adminStatus: profile.data.account.adminStatus,
                accountId: profile.data.account.accountId,
              }));
              getDateAttendance(props.setDateAttendanceNames, props.date)
              props.navigate("/main");
            }
            props.handleClose();
            }
          }>변경하기</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
