import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorMessage: '',
    product: '',
}

export const productSlice = createSlice({
    name: 'product',
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

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage } = productSlice.actions

export default productSlice.reducer