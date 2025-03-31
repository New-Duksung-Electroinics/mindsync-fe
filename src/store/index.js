// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/store/authSlice'; // authSlice 불러오기

const store = configureStore({
  reducer: {
    auth: authReducer, // auth 상태 관리
  },
});

export default store;
