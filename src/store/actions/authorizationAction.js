import api from "../../api/axios";
import { showWindowAuth } from "../slices/windowStateSlice";

export async function authorizationRequest (dispatch, data, isRememberData) {

	const result = await api.post(`/auth/token/login/`, JSON.stringify(data))
		.then((response) => {
			// console.log('response', response);
			isRememberData
			? localStorage.setItem('authorizationToken', `Token ${response.data.auth_token}`)
			: sessionStorage.setItem('authorizationToken', `Token ${response.data.auth_token}`);
			window.location.href = '/';
			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
		})

	return result
}

export async function registrationRequest (dispatch, data) {

	const result = await api.post(`/auth/users/`, JSON.stringify(data))
		.then((response) => {
			console.log('response', response);
			dispatch(showWindowAuth(false));

			return response.data;
		})
		.catch((message) => {
			console.log('error', message);
		})

	return result
}

export const logoutRequest = () => {
	api.post('/auth/token/logout/')
		.then(() => {
			localStorage.removeItem('authorizationToken');
			sessionStorage.removeItem('authorizationToken');
			window.location.href = '/';
		})
		.catch((message) => {
			console.log('error', message);
		})
}