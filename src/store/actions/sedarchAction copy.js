import api from "../../api/axios";
import { fetchError, fetchErrorMessage, fetchSuccess, fetching } from "../slices/searchSlice";


export const getWantedProductRequest = () => {
    return async (dispatch) => {
        try {
            dispatch(fetching());
            const response = await api.get('/api-product/');
            dispatch(fetchSuccess( response.data ));
        } catch (message) {
            console.log('error', message);
            if(message.response.statusText === "Unauthorized") {
                localStorage.removeItem('authorizationToken');
                window.location.href = '/authorization';
                return;
            }

            dispatch(fetchErrorMessage(message.message));
            dispatch(showErrorNotification(true));
        }
    }
}