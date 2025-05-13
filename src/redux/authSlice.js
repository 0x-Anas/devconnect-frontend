// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      // Store user info in local/session storage
      localStorage.setItem('user', JSON.stringify(action.payload));
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
      sessionStorage.setItem('user', JSON.stringify(state.user));
    }
  },
});

export const { loginSuccess, logout, updateProfile } = authSlice.actions;

// Selector to access user data
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
