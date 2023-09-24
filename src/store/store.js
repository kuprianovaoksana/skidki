import { configureStore, combineReducers } from "@reduxjs/toolkit";
import search from "./slices/searchSlice";
import product from "./slices/productSlice";
import goods from "./slices/goodsSlice";
import filters from "./slices/filters";
import statePopupWindow from "./slices/windowStateSlice";

const rootReducer = combineReducers({
    search,
    product,
    goods,
    filters,
    statePopupWindow
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}





