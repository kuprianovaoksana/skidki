import api from "../../api/axios";
import { fetchErrorMessage, fetchSuccess, fetching } from "../slices/searchSlice";


export const getWantedProductRequest = (url) => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get(`/api-product/${url}`);
            dispatch(fetchSuccess( response.data ));
        } catch (message) {
            console.log('error', message);

            dispatch(fetchErrorMessage(message.message));
        }
    }
}