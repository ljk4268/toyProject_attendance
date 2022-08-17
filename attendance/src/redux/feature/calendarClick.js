import { createSlice} from '@reduxjs/toolkit';

let calendarClick = createSlice({
  name: 'calendarClick',
  initialState: false,
  reducers:{
    changeCalendarClick(state, action){
      return state = action.payload;
    }
  }
})

export let { changeCalendarClick } = calendarClick.actions;


export default calendarClick.reducer;