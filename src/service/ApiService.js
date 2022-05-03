import axios from 'axios'

const basicToken = btoa(`${new Date().valueOf().toString()}:${process.env.VUE_APP_SECRET}`)
const api = axios.create({
    baseURL: `https://api-factory.simbirsoft1.com/api`,
    headers: {
        'X-Api-Factory-Application-Id': process.env.VUE_APP_ID,
        'Authorization': `Basic ${basicToken}`
    }
})

api.interceptors.request.use(null, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(null, error => {
    return Promise.reject(error);
});


export default api;