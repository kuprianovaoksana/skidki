import api from "../../api/axios";
import { fetchErrorMessage, fetchSuccess, fetching } from "../slices/searchSlice";


export const getWantedProductRequest = (url) => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get(`/api-product/?url=${url}`);
            console.log(response)
            dispatch(fetchSuccess( response.data ));
            window.location.href = '/choosed_product';
        } catch (message) {
            console.log('error', message);

            dispatch(fetchErrorMessage(message.message));
        }
    }
}