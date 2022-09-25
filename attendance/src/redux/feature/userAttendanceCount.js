import { createSlice} from '@reduxjs/toolkit';

let userAttendanceCount = createSlice({
  name: 'userAttendanceCount',
  initialState: [],
  reducers:{
    userCountUpdate(state, action){
      return state = action.payload;
    }
  }
})

export let { userCountUpdate } = userAttendanceCount.actions;


export default userAttendanceCount.reducer;