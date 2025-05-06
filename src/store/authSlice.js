import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginService, logout as logoutService } from 'src/services/user'; // 서비스 함수

// 🔐 로그인 Thunk
export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async ({ useremail, username, password }, { dispatch, rejectWithValue }) => {
    try {
      const res = await loginService(useremail, username, password); // 로그인 요청
      const { accessToken } = res.data; // 서버에서 받은 토큰
      
      // 전역 상태에 저장
      dispatch(setLoginInfo({ useremail, username, accessToken }));

      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🚪 로그아웃 Thunk
export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  async (_, { rejectWithValue }) => {
    try {
      await logoutService(); // 서버에 로그아웃 요청
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🧠 Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    isLoggedIn: false,
    accessToken: '', // ✅ 토큰 추가
    useremail :'',
  },
  reducers: {
    // 👤 사용자명만 저장
    setUsername: (state, action) => {
      state.username = action.payload;
      state.isLoggedIn = true;
    },
    // ✅ 사용자명 + accessToken 저장
    setLoginInfo: (state, action) => {
      const { username, useremail, accessToken } = action.payload;
      state.username = username;
      state.accessToken = accessToken;
      state.useremail = useremail;  // useremail 저장
      state.isLoggedIn = true;
    },
    // 🔄 토큰 삭제 등 직접 초기화
    clearAuth: (state) => {
      state.username = '';
      state.accessToken = '';
      state.useremail = '';  // useremail 초기화
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsync.fulfilled, (state) => {
        state.username = '';
        state.accessToken = '';
        state.isLoggedIn = false;
        state.useremail = '';  // useremail 초기화
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        console.error('Logout failed:', action.payload);
      });
  }
});

export const { setUsername, setLoginInfo, clearAuth } = authSlice.actions;
export default authSlice.reducer;
