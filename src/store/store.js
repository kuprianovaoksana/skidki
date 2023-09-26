import { configureStore, combineReducers } from "@reduxjs/toolkit";
import search from "./slices/searchSlice";
import product from "./slices/productSlice";
import goods from "./slices/goodsSlice";
import filters from "./slices/filters";
import statePopupWindow from "./slices/windowStateSlice";
import user from "./slices/userSlice";

const rootReducer = combineReducers({
    search,
    product,
    goods,
    filters,
    statePopupWindow,
    user,
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}





