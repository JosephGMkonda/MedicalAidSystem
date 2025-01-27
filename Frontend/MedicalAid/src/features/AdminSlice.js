import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchDashboardData = createAsyncThunk(
    "admin/fetchDashboardData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/adminStati");
            return response.data;
        } catch (error) {
            
            return rejectWithValue(error.response ? error.response.data : "Network Error");
        }
    }
);


const adminSlice = createSlice({
    name: "admin",
    initialState: {
      clientCount: 0,
      totalValue: 0,
      projectedProfit: 0,
      isLoading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDashboardData.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(fetchDashboardData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.clientCount = action.payload.clientCount;
          state.totalValue = action.payload.totalValue;
          state.projectedProfit = action.payload.projectedProfit;
        })
        .addCase(fetchDashboardData.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        });
    },
  });
  

export default adminSlice.reducer;
