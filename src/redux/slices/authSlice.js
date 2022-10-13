import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../utils/axios';

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async ({ fullName, email, password }) => {
    const { data } = await axios.post('/auth/register', { fullName, email, password });

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  },
);

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async ({ email, password }) => {
  const { data } = await axios.post('/auth/login', { email, password });

  if (data.token) {
    localStorage.setItem('token', data.token);
  }

  return data;
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  const { data } = await axios.get('/auth/me');

  return data;
});

export const fetchSuccess = createAsyncThunk('auth/fetchSuccess', async () => {
  const { data } = await axios.patch('/success');
  return data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    status: 'loading',
    message: null,
    success: null,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = 'loading';
      state.message = null
    },
  },
  extraReducers: {
    //Register
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
      state.message = 'Регистрация прошла успешно!';
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
      state.message = 'Произошла ошибка при регистрации';
    },
    //Login
    [fetchLogin.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
      state.message = 'Авторизация прошла успешно!';
    },
    [fetchLogin.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
      state.message = 'Произошла ошибка при авторизации';
    },
    //fetchSuccess
    [fetchSuccess.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSuccess.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
      state.message = null;
    },
    [fetchSuccess.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    //Me
    [fetchMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchMe.rejected]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
  },
});

export const checkIsAuth = (state) => !!state.auth.data;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
