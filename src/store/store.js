import { configureStore, combineReducers } from "@reduxjs/toolkit";
import search from "./slices/searchSlice";

const rootReducer = combineReducers({
    search,
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}





