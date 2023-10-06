import api from "../../api/axios";
import { fetchShopsSuccess, fetchErrorMessage, fetchCategoriesSuccess, fetchBrandsSuccess, fetchGoodsSuccess } from "../slices/goodsSlice";

export const getGoodsRequest = (param) => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api-product/${param ? `?${param}` : ''}`);
            console.log(response);
            dispatch(fetchGoodsSuccess( response.data.results ));
        } catch (message) {
            console.log('error', message);
            dispatch(fetchErrorMessage(message.message));
        }
    }
}

export const getShopsRequest = () => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api-shop/`);
            dispatch(fetchShopsSuccess( response.data.results ));
        } catch (message) {
            console.log('error', message);
            dispatch(fetchErrorMessage(message.message));
        }
    }
}

export const getCategoriesRequest = () => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api-category/`);
            dispatch(fetchCategoriesSuccess( response.data.results ));
        } catch (message) {
            console.log('error', message);
            dispatch(fetchErrorMessage(message.message));
        }
    }
}

export const getBrandsRequest = () => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api-brand/`);
            dispatch(fetchBrandsSuccess( response.data.results ));
        } catch (message) {
            console.log('error', message);
            dispatch(fetchErrorMessage(message.message));
        }
    }
}