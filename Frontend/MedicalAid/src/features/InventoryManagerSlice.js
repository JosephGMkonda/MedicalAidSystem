import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchInventorySummary = createAsyncThunk(
    "inventory/fetchSummary",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/inventoryStat"); 
            return response.data; 
        } catch (error) {
            
            return rejectWithValue(
                error.response?.data?.msg || "Failed to fetch inventory summary"
            );
        }
    }
);


const inventorySlice = createSlice({
    name: "inventory",
    initialState: {
        totalValue: 0,
        totalQuantity: 0,
        expiredProductCount: 0,
        loading: false,
        error: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventorySummary.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInventorySummary.fulfilled, (state, action) => {
                state.loading = false;
                state.totalValue = action.payload.totalValue;
                state.totalQuantity = action.payload.totalQuantity;
                state.expiredProductCount = action.payload.expiredProductCount;
            })
            .addCase(fetchInventorySummary.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default inventorySlice.reducer;
