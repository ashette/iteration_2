import { api } from '@/service/ApiService'
import { castAuth } from '../helpers';

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
        const response = await api.client.get('/db/category', { params });
        return response.data
    },
    async getPoints(params) {
        const response = await api.client.get('/db/point', { params });
        return response.data
    },
    async getRates(params) {
        const response = await api.client.get('/db/rate', { params });
        return response.data
    },
    async getCars(params) {
        const response = await api.client.get('/db/car', { params });
        return response.data
    },
    async getOrders(params) {
        const response = await api.client.get('/db/order', { params });
        return response.data
    }

}