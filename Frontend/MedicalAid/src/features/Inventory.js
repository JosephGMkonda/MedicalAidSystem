import { createSlice, asyncThunkCreator, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



const initialState = {
    inventories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}


const API_URL = "http://localhost:5000/api/inventory";

export const fetchInventory = createAsyncThunk("inventory/fetchInventory", async(_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message)
        
    }
})

export const addInventory = createAsyncThunk("inventory/addInventory", async(inventoryData, thunkAPI) => {
    try {
        const response = await axios.post(API_URL, inventoryData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);

        
    }
})

export const editInventory = createAsyncThunk("inventory/editInventory", async({id, inventoryData}, thunkAPI) => {
    try {
      console.log("UUID:", id); 
      console.log("Data Sent:", inventoryData); 
        const response = await axios.patch(`${API_URL}/${id}`, inventoryData);
        console.log("Response Data:", response.data)
        
        return response.data
    } catch (error) {
       console.error("Error:", error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
        
    }
})


export const deleteInventory = createAsyncThunk(
  'inventory/deleteInventory',
  async (uuid, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/inventory/${uuid}`);
      return uuid; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const inventorySlice = createSlice({
    name: "inventories",
    initialState,
    reducers: {
        resetSate: () => initialState,
    },

    extraReducers: (builder) => {

        // fetch inventory
        builder.addCase(fetchInventory.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(fetchInventory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.inventories = action.payload;
          });

        builder.addCase(fetchInventory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });

        //   add inventory

        builder.addCase(addInventory.pending, (state) => {
            state.isLoading = true;
          });
        builder.addCase(addInventory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.inventories.push(action.payload);
          });
        builder.addCase(addInventory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });

        //   edit inventory
        builder.addCase(editInventory.pending, (state) => {
            state.isLoading = true;
          });
        builder.addCase(editInventory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.inventories = state.inventories.map((inventory) =>
              inventory.uuid === action.payload.uuid ? action.payload : inventory
          );
            
          });
        builder.addCase(editInventory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        
          });

        // delete users

        builder.addCase(deleteInventory.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(deleteInventory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.inventories = state.inventories.filter((inventory) => inventory.id !== action.payload);
          });
          builder.addCase(deleteInventory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });



        
    }
})

export const { resetState } = inventorySlice.actions;
export default inventorySlice.reducer;