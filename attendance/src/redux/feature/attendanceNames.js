import { createSlice} from '@reduxjs/toolkit';

let $attNames = createSlice({
  name : '$attNames',
  initialState: [],
  reducers: {
    changeNameArray(state, action){
      let newState = {...state}
      newState = action.payload
      return newState
    }
  }
})

export let { changeNameArray } = $attNames.actions;


export default $attNames.reducer;