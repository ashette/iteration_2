import { api } from '@/service/ApiService'
import { castAuth, castOrder, castRate, castCar } from '../helpers';

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
    async createCategory(newData, params) {
        const { data } = await api.client.post(`/db/category`, newData, { params });
        return data
    },
    async updateCategory(id, newData, params) {
        const { data } = await api.client.put(`/db/category/${id}`, newData, { params });
        return data
    },
    async deleteCategory(id, params) {
        const { data } = await api.client.delete(`/db/category/${id}`, { params });
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
    async getCarData(id, params) {
        const { data } = await api.client.get(`/db/car/${id}`, { params });
        return castCar(data.data)
    },
    async getOrders(params) {
        const { data } = await api.client.get('/db/order', { params });
        return data
    },
    async getOrderData(id, params) {
        const { data } = await api.client.get(`/db/order/${id}`, { params });
        return castOrder(data.data)
    },
}