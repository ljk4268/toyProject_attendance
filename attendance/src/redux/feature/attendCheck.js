import { createSlice} from '@reduxjs/toolkit';

let attendCheck = createSlice({
  name: 'attendCheck',
  initialState: false,
  reducers:{
    changeAttendCheck(state, action){
      return state = action.payload;
    }
  }
})

export let { changeAttendCheck } = attendCheck.actions;


export default attendCheck.reducer;