import axios from 'axios';

export default axios.create({
    baseURL: 'https://',

    headers: { 'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': ''
             },
});