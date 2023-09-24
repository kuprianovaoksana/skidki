import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: '',
    errorMessage: '',
    allGoods: [],
    userGoods: '',
    goodsView: 'list',
    shops: [],
    categories: [],
    brands: [],
}

export const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        fetching: (state) => {
            state.loading = true;
        },
        fetchGoodsSuccess: (state, action) => {
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
        fetchShopsSuccess: (state, action) => {
            state.shops = action.payload;
        },
        fetchCategoriesSuccess: (state, action) => {
            state.categories = action.payload;
        },
        fetchBrandsSuccess: (state, action) => {
            state.brands = action.payload;
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