import { createSlice } from "@reduxjs/toolkit";

import api from "../../api/axios.js";

const initialState = {
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state.user = action.payload), (state.error = null);
    },
    logout: (state) => {
      state.user = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, logout, setError } = authSlice.actions;
export default authSlice.reducer;

export const loginUser = async (form,dispatch) => {
  try {
    const res = await api.post("/auth/login", form);
    dispatch(setUser(res.data));
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Login failed"));
  }
};

export const registerUser=async(form,dispatch)=>{
    try {
        console.log("h4")
        const res=await api.post("auth/register",form);
        console.log("h5")
        dispatch(setUser(res.data));
        console.log("h6")
    } catch (error) {
        console.log("h7")
        dispatch(setError(error.response?.data?.message || 'Registration failed'))
        console.log("h8")
    }
}

export const fetchProfile=()=>async(dispatch)=>{
    try {
        const res = await api.get('/auth/me');
    dispatch(setUser(res.data));
    } catch (error) {
         dispatch(setUser(null));
    }
}

export const logoutUser = () => async (dispatch) => {
  await api.get('/auth/logout');
  dispatch(logout());
};
