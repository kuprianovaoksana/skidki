import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorMessage: '',
    user: '',
    userToken: localStorage.authorizationTokenDiscountMan || sessionStorage.authorizationTokenDiscountMan,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchErrorMessage: (state, action) => {
            state.loading = false;
            state.errorMessage = action.payload;
        }
    }
})

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage } = userSlice.actions

export default userSlice.reducer