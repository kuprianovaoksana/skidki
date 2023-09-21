import axios from 'axios';

export default axios.create({
    baseURL: 'http://xn--80ahlhcmifw.xn--p1ai',
    
    headers: { 'accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('authorizationToken')}`
             },
});