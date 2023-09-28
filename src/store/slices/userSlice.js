import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: '',
    errorMessage: '',
    userId: '',
    userToken: localStorage.authorizationTokenDiscountMan || sessionStorage.authorizationTokenDiscountMan,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserSuccess: (state, action) => {
            state.userId = action.payload;
        },
        fetchError: (state, action) => {
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        }
    }
})

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage } = userSlice.actions;

export default userSlice.reducer;