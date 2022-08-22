import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//component
import NavbarTop from "../component/navbarTop";
import MainLogo from "../component/mianLogo";
import PlaceInput from "../component/placeInput";
import { getPlaces } from "../module/places";
import { getToday } from "../module/getToday";

// 함수
import {
  postDateAttendance,
  getDateAttendance,
  postAttendanceUpdate,
} from "../module/user";
import { changePopUpOn } from "../redux/feature/popUpOn";

//mui라이브러리
import * as React from "react";
import Box from "@mui/material/Box";
import { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NoMealsOutlinedIcon from "@mui/icons-material/NoMealsOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function AttendRegistration() {

  // 팝업창에서 날짜 클릭하고 출석등록 누르면 전달받는 날짜.
  const location = useLocation();
  const popUpDate = location.state.clickdate;

  const userInfo = useSelector((state) => {
    return state.user;
  });
  const editMode = useSelector((state) => {
    return state.editMode;
  });
  const userAccountId = useSelector((state) => {
    return state.userAccountId;
  });
  const popUpOn = useSelector((state) => {
    return state.popUpOn;
  });


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const [alignment, setAlignment] = useState(null);
  const [mealAlignment, setMealAlignment] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [warningWindow, setWarningWindow] = useState(false);
  const [datePlaces, setDatePlaces] = useState([0]);
  const [locationId, setLocationId] = useState(null);
  const [attendanceId, setAttendanceId] = useState(null);
  const [mealStatus, setMealStatus] = useState(null);
  const today = getToday();
  const [date, setDate] = useState(today);
  const user = userInfo.nickname;

  let dayOfWeek = week[new Date(date).getDay()];

  useEffect(() => {
    if (popUpOn) {
      setDate(popUpDate);
    }
    console.log('언제실행되니?')
    getPlaces(setDatePlaces, date);

    if (editMode) {
      async function attanceUserData() {
        let attanceList = await getDateAttendance(null, date, userAccountId);
        let userData = attanceList.find(
          (lists) => lists.accountId == userAccountId.accountId
        );
        setLocationId(userData.locationId);
        setAttendanceId(userData.attendanceId);
        setMealAlignment(userData.mealStatus);
        if (userData.locationName == null) {
          setAlignment("alone");
        } else {
          setAlignment(userData.locationName);
        }
      }
      attanceUserData();
    }
  }, [popUpOn, date]);


  // 함수
  /**
   * 서버에 해당날짜 출석등록 또는 출석 update를 요청하는 함수
   */
  async function postAttendance() {
    // 수정모드일때
    if (editMode) {
      if (alignment == null || mealAlignment == null) {
        setAlertOpen(true);
      } else {
        let changeAtndn = await postAttendanceUpdate(
          date,
          locationId,
          mealStatus,
          attendanceId
        );

        if (changeAtndn.data.success == "ok") {
          if (popUpOn) {
            dispatch(changePopUpOn(false));
            navigate("/calendar");
          } else {
            navigate("/main");
          }
        }
      }
    } else {
      // 등록 모드일 때
      if (locationId == null || mealStatus == null) {
        setAlertOpen(true);
      } else {
        let entry = await postDateAttendance(date, locationId, mealStatus);

        if (entry.data.reason == "해당 날짜에 이미 등록한 유저!") {
          setWarningWindow(true);
        }
        if (entry.data.success == "ok") {
          if (popUpOn) {
            dispatch(changePopUpOn(false));
            navigate("/calendar");
          } else {
            navigate("/main");
          }
        }
      }
    }
  }

  /**
   * 모임장소 등록하는 Input태그 밑에 쓰여지는 input태그의 용도에 대한 설명
   * @returns 변수 helperText에 담긴 내용을 리턴해준다.
   */
  function MyFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      return "모임 장소 등록을 원하시는 경우 장소를 등록해주세요.";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

  /**
   * 모임장소 리스트의 value가 바뀌면서 value값으로 모임장소 선택이 고정되고 locationId도 바꿔준다. 
   * 사용자가 모임장소를 아무것도 선택하지 않으면 locationId를 null로 바꿔 등록 혹은 수정할 때 알림창이 나오도록 한다. 
   * @param event : 클릭된 요소를 찾기 위함.
   * @param newAlignment : 클릭한 모임장소의 이름이 나옴.
   */
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);

    if (newAlignment != null) {
      setLocationId(event.currentTarget.dataset.id);
    } else {
      setLocationId(null);
    }
  };

  /**
   * 식사여부의 value가 바뀌면서 value값으로 식사여부 선택이 고정되고 mealStatus도 바꿔준다. 
   * * 사용자가 모임장소를 아무것도 선택하지 않으면 mealStatus를 null로 바꿔 등록 혹은 수정할 때 알림창이 나오도록 한다. 
   * @param event : 클릭된 요소를 찾기 위함.
   * @param newMealAlignment : 클릭한 식사여부의 이름이 나옴.
   */
  const mealHandleAlignment = (event, newMealAlignment) => {
    setMealAlignment(newMealAlignment);

    if (newMealAlignment != null) {
      setMealStatus(event.currentTarget.dataset.id);
    } else {
      setMealStatus(null);
    }
  };

  /**
   * 알림창이 켜져있는경우 해당 함수를 실행하면 알림창이 꺼진다.
   */
  const handleClose = () => {
    setAlertOpen(false);
    setWarningWindow(false);
  };

  // const로 리팩토링 >> 태그를 변수화한거임.
  const showPlaces = (
    <div className="showPlaces">
      <ToggleButtonGroup
        orientation="vertical"
        value={alignment}
        color="primary"
        exclusive
        onChange={handleChange}
        sx={{ width: "100%" }}
      >
        <ToggleButton value="alone" data-id="-1">
          혼자 할게요
        </ToggleButton>

        {datePlaces.map((place, i) => {
          if (place.locationName != undefined) {
            return (
              <ToggleButton
                key={i}
                value={place.locationName}
                data-id={place.locationId}
                className="toggle-button"
              >
                {place.locationName}
              </ToggleButton>
            );
          }
        })}
      </ToggleButtonGroup>
    </div>
  );

  const placeInput = (
    <div>
      <PlaceInput setDatePlaces={setDatePlaces} date={date} />
      <Box sx={{ width: "90vw" }}>
        <MyFormHelperText />
      </Box>
    </div>
  );

  const seletedMeal = (
    <div>
      <ToggleButtonGroup
        orientation="vertical"
        value={mealAlignment}
        color="primary"
        exclusive
        onChange={mealHandleAlignment}
        sx={{ width: "100%" }}
      >
        <ToggleButton value="Y" data-id="Y">
          <RestaurantOutlinedIcon sx={{ fontSize: 19 }} />
          <span className="meal">같이 먹어요!</span>
        </ToggleButton>
        <ToggleButton value="N" data-id="N">
          <NoMealsOutlinedIcon sx={{ fontSize: 19 }} />
          <span className="meal">안먹을래요!</span>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );

  const entryAlert = (
    <Dialog
      open={alertOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          버튼 선택 후 등록해주세요.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );

  const alreadyAttended = (
    <Dialog
      open={warningWindow}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          해당날짜에 출석 등록이 되어있습니다!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );

  const attendanceButton = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      {editMode == true ? (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button sx={{ width: "150px" }} size="large" onClick={postAttendance}>
            출석수정하기
          </Button>
          <Button
            sx={{ width: "150px" }}
            size="large"
            onClick={() => {
              if (popUpOn) {
                dispatch(changePopUpOn(false));
                navigate("/calendar");
              } else {
                navigate("/main");
              }
            }}
          >
            취소
          </Button>
        </ButtonGroup>
      ) : (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button
            sx={{ width: "150px" }}
            size="large"
            onClick={() => {
              postAttendance();
            }}
          >
            출석등록하기
          </Button>
          <Button
            sx={{ width: "150px" }}
            size="large"
            onClick={() => {
              if (popUpOn) {
                dispatch(changePopUpOn(false));
                navigate("/calendar");
              } else {
                navigate("/main");
              }
            }}
          >
            취소
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );

  return (
    <>
      <NavbarTop />
      <MainLogo />

      {editMode == false ? (
        <div>
          {/* editMode가 false 일 때 보여지는 UI */}
          <p className="userHi"> {user} 님, 출석등록을 하시겠습니까? </p>

          <div className="main-bottom">
            <p className="todayList">
              <span className="calendarIcon">
                <CalendarMonthOutlinedIcon />
              </span>
              {date} ({dayOfWeek})
            </p>

            {/* 모임장소 선택하는 부분  */}
            <div>
              <p className="todayList">참석할 모임장소 선택!</p>

              {placeInput}

              {showPlaces}
            </div>

            <p className="todayList">식사 하실분!</p>

            {/* 식사여부 선택하는 부분  */}
            {seletedMeal}

            <p className="todayList"></p>

            {/* 출석등록 버튼  */}
            {attendanceButton}
          </div>

          {/* alert 창 */}
          {entryAlert}
          {alreadyAttended}
        </div>
      ) : (
        // editMode가 true 일 때 보여지는 UI
        <div>
          <p className="userHi"> {user} 님, 출석 수정 하시겠습니까? </p>

          <div className="main-bottom">
            <p className="todayList">
              <span className="calendarIcon">
                <CalendarMonthOutlinedIcon />
              </span>
              {date} ({dayOfWeek})
            </p>

            {/* 모임장소 선택하는 부분  */}
            <div>
              <p className="todayList">참석할 모임장소 선택!</p>

              {placeInput}

              {showPlaces}
            </div>

            <p className="todayList">식사 하실분!</p>

            {/* 식사여부 선택하는 부분  */}
            {seletedMeal}

            <p className="todayList"></p>

            {/* 출석등록 버튼  */}
            {attendanceButton}
          </div>

          {/* alert 창 */}
          {entryAlert}
          {alreadyAttended}
        </div>
      )}
    </>
  );
}

export default AttendRegistration;
