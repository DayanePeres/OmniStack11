import axios from 'axios';

const api = axios.create({
     baseURL:  'http://192.168.0.26:3333' //'exp://sr-75w.anonymous.mobile.exp.direct:80'
});

export default api;