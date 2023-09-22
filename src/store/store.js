import { configureStore, combineReducers } from "@reduxjs/toolkit";
import search from "./slices/searchSlice";
import product from "./slices/productSlice";
import goods from "./slices/goodsSlice";

const rootReducer = combineReducers({
    search,
    product,
    goods,

})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}





