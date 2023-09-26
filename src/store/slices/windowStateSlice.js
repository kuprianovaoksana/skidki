import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	windowInfo: false,
	windowAuth: false,
}

export const statePopupWindow = createSlice({
	name: 'statePopupWindow',
	initialState,
	reducers: {
		showWindowInfo(state, action) {
			state.windowInfo = action.payload;
		},
		showWindowAuth(state, action) {
			state.windowAuth = action.payload;
		},
	},
})

export const { showWindowInfo, showWindowAuth } = statePopupWindow.actions;

export default statePopupWindow.reducer;