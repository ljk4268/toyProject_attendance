
import { createStore } from '@reduxjs/toolkit';

import UserReducer from './feature/user';
import MonthReducer from './feature/month';
import AttendListReducer from './feature/attendList';
import AttendanceNamesReducer from './feature/attendanceNames';
import UserAccountIdReducer from './feature/userAccountId';

import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import {combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  user: UserReducer,
  month: MonthReducer,
  $attListObj: AttendListReducer,
  $attNames: AttendanceNamesReducer,
  userAccountId:UserAccountIdReducer
});


const persistedReducer = persistReducer(persistConfig, reducer);

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

// 변수 등록하는 공간 
// 여기에 등록해야만 모든 컴포넌트들이 state를 가져다 사용할 수 있음. 
const store = createStore(persistedReducer, enhancer);

export default store;

// export default configureStore({
//   reducer: persistedReducer,
// })