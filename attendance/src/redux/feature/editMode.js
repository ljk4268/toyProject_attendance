import { createSlice} from '@reduxjs/toolkit';

let editMode = createSlice({
  name: 'editMode',
  initialState: false,
  reducers:{
    changeEditMode(state, action){
      return state = action.payload;
    }
  }
})

export let { changeEditMode } = editMode.actions;


export default editMode.reducer;