import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNearExpiryProducts = createAsyncThunk(
  "nearExpiry/fetchNearExpiryProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/nearExpProduct");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Network Error");
    }
  }
);

const nearExpirySlice = createSlice({
  name: "nearExpiry",
  initialState: {
    products: [], // Original products list from the API
    isLoading: false,
    error: null,
    percentageData: [], // Data formatted for the pie chart
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearExpiryProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNearExpiryProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;

        // Calculate total quantity and percentages
        const totalQuantity = action.payload.reduce(
          (sum, product) => sum + product.quantity,
          0
        );

        state.percentageData = action.payload.map((product) => ({
          name: product.productName,
          value: parseFloat(((product.quantity / totalQuantity) * 100).toFixed(2)), // Convert to number
        }));
        
      })
      .addCase(fetchNearExpiryProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("Fetch Error:", action.payload); // Debugging line
        console.log("Formatted Percentage Data:", state.percentageData);
      });
     
      
  },

});

export default nearExpirySlice.reducer;
