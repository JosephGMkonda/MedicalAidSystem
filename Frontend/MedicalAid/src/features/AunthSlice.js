import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    user: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}


export const LoginUser = createAsyncThunk ("user/LoginUser", async(user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/login", {
            email: user.email,
            password: user.password
        })
        return response.data;
    } catch (error) {
        if(error.response && error.response.data ){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
        return thunkAPI.rejectWithValue(error.message)
        
    }
})

export const getMe = createAsyncThunk ("user/getMe", async(user, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:5000/api/me");
        return response.data;
    } catch (error) {
        if(error.response && error.response.data ){
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
        return thunkAPI.rejectWithValue(error.message)
        
    }
})


export const LogOutUser = createAsyncThunk ("user/LogOutUser", async() => {

         await axios.delete("http://localhost:5000/api/logout");
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers:(builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;

        });

        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        


        
        // getMe cases

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true
        });

        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;

        });

        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });



    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;
