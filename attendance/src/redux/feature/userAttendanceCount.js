import { createSlice} from '@reduxjs/toolkit';

let userAttendanceCount = createSlice({
  name: 'userAttendanceCount',
  initialState: [{offlineCount:0,onlineCount:0}],
  reducers:{
    userCountUpdate(state, action){
      let newState = {...state}
      newState = action.payload
      return newState
    }
  }
})

export let { userCountUpdate } = userAttendanceCount.actions;


export default userAttendanceCount.reducer;