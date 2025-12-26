import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  userRole: 'author', // Default role for authenticated users: author
  isEmailVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.userRole = action.payload.userRole || action.payload.userData?.prefs?.role || 'author';
      state.isEmailVerified = action.payload.userData?.emailVerification || false;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.userRole = 'author'; // Reset to default for next login
      state.isEmailVerified = false;
    },
    updateRole: (state, action) => {
      state.userRole = action.payload.role;
    },
    updateEmailVerification: (state, action) => {
      state.isEmailVerified = action.payload.isVerified;
    },
  },
});

export const { login, logout, updateRole, updateEmailVerification } = authSlice.actions;
export default authSlice.reducer;
