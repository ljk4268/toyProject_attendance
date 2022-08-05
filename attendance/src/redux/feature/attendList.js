import { createSlice} from '@reduxjs/toolkit';

let $attListObj = createSlice({
  name : '$attObj',
  initialState: {},
  reducers: {
    changObj(state,action){
      let newState = {...state}
      newState = action.payload
      return newState
    }
  }
})

export let { changObj } = $attListObj.actions;


export default $attListObj.reducer;