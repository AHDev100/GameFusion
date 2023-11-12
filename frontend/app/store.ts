import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuth: false, token: null },
  reducers: {
    login: (state, action) => {
        state.isAuth = action.payload.isAuth;
        state.token = action.payload.token;
    },
    logout: (state) => {
        state.isAuth = false;
        state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;