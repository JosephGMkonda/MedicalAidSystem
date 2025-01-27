import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


export const fetchLowStockProducts = createAsyncThunk(
  "lowStock/fetchLowStockProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/lowstock");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network Error");
    }
  }
);

const lowStockSlice = createSlice({
  name: "lowStock",
  initialState: {
    products: [], 
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLowStockProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLowStockProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchLowStockProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default lowStockSlice.reducer;
