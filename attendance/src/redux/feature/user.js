import { createSlice} from '@reduxjs/toolkit';

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

export let { userDate } = user.actions;


export default user.reducer;