import { createSlice } from '@reduxjs/toolkit';
// import { toast } from 'react-toastify';

const initialState = {
  isAuthenticated: !!localStorage.getItem("add-new-book-token"),
  tkn: localStorage.getItem("add-new-book-token") || null,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.tkn = action.payload.tkn;
      state.isAuthenticated = true;
      localStorage.setItem("add-new-book-token", action.payload.tkn);
    },
    logout: (state) => {
      state.tkn = null;
      state.isAuthenticated = false;
      localStorage.removeItem("add-new-book-token");
      // toast.success('loged out succesfully')
    },
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
