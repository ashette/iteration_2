import { api } from '@/service/ApiService'
import { castAuth, castOrder, castRate } from '../helpers';

const basicToken = btoa(`${new Date().valueOf().toString()}:${process.env.VUE_APP_SECRET}`)
export default {
    async login(username, password) {
        const { data } = await api.client.post('/auth/login',
            { username, password },
            {
                headers: {
                    'Authorization': `Basic ${basicToken}`
                }
            });
        return castAuth(data)
    },
    async logout() {
        const { data } = await api.client.post('/auth/logout');
        return data
    },
    async getCategories(params) {
        const { data } = await api.client.get('/db/category', { params });
        return data
    },
    async getPoints(params) {
        const { data } = await api.client.get('/db/point', { params });
        return data
    },
    async getCities(params) {
        const { data } = await api.client.get('/db/city', { params });
        return data
    },
    async getRates(params) {
        const { data } = await api.client.get('/db/rate', { params });
        data.data = data.data.map(item => castRate(item))
        return data
    },
    async getCars(params) {
        const { data } = await api.client.get('/db/car', { params });
        return data
    },
    async getOrders(params) {
        const { data } = await api.client.get('/db/order', { params });
        return data
    },
    async getOrderData(orderId, params) {
        const { data } = await api.client.get(`/db/order/${orderId}`, { params });
        return castOrder(data.data)
    },
}