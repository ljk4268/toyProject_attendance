import { createSlice} from '@reduxjs/toolkit';

let user = createSlice({
  name: 'user',
  initialState: {kakaoId: '', nickname: '', email: '', adminStatus:'', accountId:''},
  reducers:{
    userDate(state, action){
      state.kakaoId = action.payload.kakaoId,
      state.nickname = action.payload.nickname,
      state.email = action.payload.email,
      state.adminStatus = action.payload.adminStatus,
      state.accountId = action.payload.accountId
    }
  }
})

export let { userDate } = user.actions;


export default user.reducer;