import { createSlice} from '@reduxjs/toolkit';

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

export let { changeMonth } = month.actions;


export default month.reducer;