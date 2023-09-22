import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorMessage: '',
    allGoods: '',
    userGoods: '',
    goodsView: 'list',
    goodsCategory: '',
}

export const goodsSlice = createSlice({
    name: 'goods',
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
        },
        setProductCardViewTile: (state) => {
            state.goodsView = 'tile';
        },
		setProductCardViewList: (state) => {
            state.goodsView = 'list';
        },
    }
});

export const { fetching, fetchSuccess, fetchError, fetchErrorMessage, setProductCardViewTile, setProductCardViewList } = goodsSlice.actions

export default goodsSlice.reducer