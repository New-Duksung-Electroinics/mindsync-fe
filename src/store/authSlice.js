// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '', // 사용자명 초기값을 빈 문자열로 설정
    isLoggedIn: false,
  },
  reducers: {
    // 사용자명을 저장하는 액션
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.username = ''; // 로그아웃 시 사용자명 초기화
      state.isLoggedIn = false;
    },
  },
});

export const { setUsername, logout } = authSlice.actions;
export default authSlice.reducer;
