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

export let { userDate } = user.actions

// 변수 등록하는 공간 
// 여기에 등록해야만 모든 컴포넌트들이 state를 가져다 사용할 수 있음. 
export default configureStore({
  reducer: { 
    user: user.reducer
  }
})