// src/redux/registrationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Step 2 Registration API call
export const registerUserStep2 = createAsyncThunk(
  "registration/registerUserStep2",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://shyeyes-b.onrender.com/api/auth/register/step2",
        payload
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    success: false,
    error: null,
    user: null,
    token: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserStep2.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerUserStep2.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload.user; // 👈 API response user store
        state.token = action.payload.token; // 👈 token bhi store
      })
      .addCase(registerUserStep2.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default registrationSlice.reducer;
