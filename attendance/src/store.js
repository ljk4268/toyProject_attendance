import { configureStore, createSlice } from '@reduxjs/toolkit'


// useState의 역할
let user = createSlice({
  name: 'user',
  initialState: {kakaoId: '', nickname: '', email: ''},
  reducers:{
    userDate(state, action){
      state.kakaoId = action.payload.kakaoId,
      state.nickname = action.payload.nickname,
      state.email = action.payload.email
    }
  }
})

let month = createSlice({
  name : 'month',
  initialState: {year: '0000', month: '00'},
  reducers : {
    changeMonth(state, action){
      state.year = action.payload.year
      state.month = action.payload.month
    }
  }
})

let $attObj = createSlice({
  name : '$attObj',
  initialState: {},
  reducers: {
    changObj(state,action){
      let newState = {...state}
      newState = action.payload
      return newState
    }
  }
})




export let { userDate } = user.actions
export let { changeMonth } = month.actions
export let { changObj } = $attObj.actions


// 변수 등록하는 공간 
// 여기에 등록해야만 모든 컴포넌트들이 state를 가져다 사용할 수 있음. 
export default configureStore({
  reducer: { 
    user: user.reducer,
    month: month.reducer,
    $attObj: $attObj.reducer
  }
})