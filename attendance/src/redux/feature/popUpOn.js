import { createSlice} from '@reduxjs/toolkit';

let popUpOn = createSlice({
  name: 'popUpOn',
  initialState: false,
  reducers:{
    changePopUpOn(state, action){
      return state = action.payload;
    }
  }
})

export let { changePopUpOn } = popUpOn.actions;


export default popUpOn.reducer;