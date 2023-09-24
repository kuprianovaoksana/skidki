import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	windowInfo: false,
}

export const statePopupWindow = createSlice({
	name: 'statePopupWindow',
	initialState,
	reducers: {
		showWindowInfo(state, action) {
			state.windowInfo = action.payload;
		},
	},
})

export const { showWindowInfo } = statePopupWindow.actions;

export default statePopupWindow.reducer;