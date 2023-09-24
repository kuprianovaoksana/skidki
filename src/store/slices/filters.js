import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	sort: 0,
	orderBy: '',
	shop: [],
	category: [],
	brand: [],
	priceFrom: 0,
	priceTo: '',
}

export const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		selectShop(state, action) {
			state.shop = action.payload;
		},
		selectCategory(state, action) {
			state.category = action.payload;
		},
		selectBrand: (state, action) => {
			state.brand = action.payload;
		},
		selectPriceFrom(state, action) {
			state.priceFrom = action.payload;
		},
		selectPriceTo(state, action) {
			state.priceTo = action.payload;
		},
		selectSort: (state, action) => {
			state.sort = action.payload
		},
	},
})

export const { selectSort, selectShop, selectCategory, selectBrand, selectPriceFrom, selectPriceTo } = filterSlice.actions;

export default filterSlice.reducer;