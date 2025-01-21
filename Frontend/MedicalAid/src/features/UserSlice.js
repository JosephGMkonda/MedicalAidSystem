import { createSlice, asyncThunkCreator, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'



const initialState = {
    users: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}


const API_URL = "http://localhost:5000/api/users";

export const fetchUser = createAsyncThunk("users/fetchUser", async(_, thunkAPI) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {

        return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message)
        
    }
})

export const addUser = createAsyncThunk("users/addUser", async(userData, thunkAPI) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);

        
    }
})

export const editUser = createAsyncThunk("users/editUser", async({id, userData}, thunkAPI) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, userData);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
        
    }
})


export const deleteUser = createAsyncThunk("users/deleteUser", async (id, thunkAPI) => {
     try {
        await axios.delete(`${API_URL}/${id}`);
     } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
        
     }
})

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetSate: () => initialState,
    },

    extraReducers: (builder) => {

        // fetch users
        builder.addCase(fetchUser.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = action.payload;
          });

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });

        //   add user

        builder.addCase(addUser.pending, (state) => {
            state.isLoading = true;
          });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users.push(action.payload);
          });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });

        //   edit users 
        builder.addCase(editUser.pending, (state) => {
            state.isLoading = true;
          });
        builder.addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = state.users.map((user) =>
              user.id === action.payload.id ? action.payload : user
            );
          });
        builder.addCase(editUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });

        // delete users

        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
          });
          builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = state.users.filter((user) => user.id !== action.payload);
          });
          builder.addCase(deleteUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          });



        
    }
})

export const { resetState } = userSlice.actions;
export default userSlice.reducer;