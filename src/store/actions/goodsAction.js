import api from "../../api/axios";
import { fetchShopsSuccess, fetchErrorMessage, fetchCategoriesSuccess, fetchBrandsSuccess } from "../slices/filters";

export const getGoodsRequest = () => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api-product/`);
            dispatch(fetchShopsSuccess( response.data ));
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }
            dispatch(fetchErrorMessage(message.message));
        }
    }
}

export const getShopsRequest = () => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api-site/`);
            dispatch(fetchShopsSuccess( response.data ));
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }
            dispatch(fetchErrorMessage(message.message));
        }
    }
}

export const getCategoriesRequest = () => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api-category/`);
            dispatch(fetchCategoriesSuccess( response.data ));
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }
            dispatch(fetchErrorMessage(message.message));
        }
    }
}

export const getBrandsRequest = () => {
    return async (dispatch) => {
        try {
            const response = await api.get(`/api-brand/`);
            dispatch(fetchBrandsSuccess( response.data ));
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }
            dispatch(fetchErrorMessage(message.message));
        }
    }
}