import axios from 'axios';

export default axios.create({
    baseURL: 'http://46.101.102.81:8000/',

    headers: { 'accept': 'application/json',
                'Content-Type': 'application/json',
                // 'Authorization': localStorage.authorizationTokenDiscountMan
                // || sessionStorage.authorizationTokenDiscountMan
             },
});