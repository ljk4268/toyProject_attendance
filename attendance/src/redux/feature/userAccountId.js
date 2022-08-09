import { createSlice} from '@reduxjs/toolkit';

let userAccountId = createSlice({
  name: 'userAccountId',
  initialState: {accountId : 0},
  reducers:{
    userAcId(state, action){
      state.accountId = action.payload[0].accountId
    }
  }
})

export let { userAcId } = userAccountId.actions;


export default userAccountId.reducer;