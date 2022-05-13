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
    async createPoint(newData, params) {
        const { data } = await api.client.post(`/db/point`, newData, { params });
        return data
    },
    async updatePoint(id, newData, params) {
        const { data } = await api.client.put(`/db/point/${id}`, newData, { params });
        return data
    },
    async deletePoint(id, params) {
        const { data } = await api.client.delete(`/db/point/${id}`, { params });
        return data
    },
    async getCities(params) {
        const { data } = await api.client.get('/db/city', { params });
        return data
    },
    async createCity(newData, params) {
        const { data } = await api.client.post(`/db/city`, newData, { params });
        return data
    },
    async updateCity(id, newData, params) {
        const { data } = await api.client.put(`/db/city/${id}`, newData, { params });
        return data
    },
    async deleteCity(id, params) {
        const { data } = await api.client.delete(`/db/city/${id}`, { params });
        return data
    },
    async getRates(params) {
        const { data } = await api.client.get('/db/rate', { params });
        data.data = data.data.map(item => castRate(item))
        return data
    },
    async createRate(newData, params) {
        const { data } = await api.client.post(`/db/rate`, newData, { params });
        return data
    },
    async updateRate(id, newData, params) {
        const { data } = await api.client.put(`/db/rate/${id}`, newData, { params });
        return data
    },
    async deleteRate(id, params) {
        const { data } = await api.client.delete(`/db/rate/${id}`, { params });
        return data
    },
    async getUnits(params) {
        const { data } = await api.client.get('/db/rateType', { params });
        return data
    },
    async createUnit(newData, params) {
        const { data } = await api.client.post(`/db/rateType`, newData, { params });
        return data
    },
    async updateUnit(id, newData, params) {
        const { data } = await api.client.put(`/db/rateType/${id}`, newData, { params });
        return data
    },
    async deleteUnit(id, params) {
        const { data } = await api.client.delete(`/db/rateType/${id}`, { params });
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
    async createCar(newData, params) {
        const { data } = await api.client.post(`/db/car`, newData, { params });
        return data
    },
    async updateCar(id, newData, params) {
        const { data } = await api.client.put(`/db/car/${id}`, newData, { params });
        return data
    },
    async deleteCar(id, params) {
        const { data } = await api.client.delete(`/db/car/${id}`, { params });
        return data
    },
    async getOrders(params) {
        const { data } = await api.client.get('/db/order', { params });
        return data
    },
    async getOrderData(id, params) {
        const { data } = await api.client.get(`/db/order/${id}`, { params });
        return castOrder(data.data)
    },
    async updateOrder(id, newData, params) {
        const { data } = await api.client.put(`/db/order/${id}`, newData, { params });
        return data
    },
    async deleteOrder(id, params) {
        const { data } = await api.client.delete(`/db/order/${id}`, { params });
        return data
    },
}