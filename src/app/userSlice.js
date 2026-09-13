import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/api";

export const fetchSearchedUser = createAsyncThunk(
  "user/fetchSearchedUser",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/users/search-data/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",

  initialState: {
    searchedUser: null,
    isConnected: false,
    isRequestSent: false,
    loading: false,
    error: null,
  },

  reducers: {
    clearSearchedUser: (state) => {
      state.searchedUser = null;
      state.isConnected = false;
      state.isRequestSent = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSearchedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedUser = action.payload.user;
        state.isConnected = action.payload.isConnected;
        state.isRequestSent = action.payload.isRequestSent;
      })

      .addCase(fetchSearchedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchedUser } = userSlice.actions;

export default userSlice.reducer;