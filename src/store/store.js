import { configureStore, combineReducers } from "@reduxjs/toolkit";
import search from "./slices/searchSlice";
import product from "./slices/productSlice";

const rootReducer = combineReducers({
    search,
    product,
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}





