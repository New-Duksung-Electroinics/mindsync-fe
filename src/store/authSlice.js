
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout as logoutService } from "src/services/user"; // 서비스 함수 가져오기

// 비동기 로그아웃 액션 (Thunk) What is Thunk..
export const logoutAsync = createAsyncThunk(
    'auth/logoutAsync',
    async (_, { rejectWithValue }) => {
      try {
        await logoutService(); // 서버에 로그아웃 요청
        return true; // 성공 시 true 반환
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

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
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        state.username = '';
        state.isLoggedIn = false;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        console.error('logout failure :', action.payload);
      });
  },
});

export const { setUsername, logout } = authSlice.actions;
export default authSlice.reducer;
