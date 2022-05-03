import Api from '@/service/ApiService'

export default {
    async login(username, password) {
        const response = await Api.post('/auth/login', { username, password });
        return response.data
    },
    async getCategories(params) {
        const response = await Api.get('/db/category', { params });
        return response.data
    },
    async getPoints(params) {
        const response = await Api.get('/db/point', { params });
        return response.data
    },
    async getRates(params) {
        const response = await Api.get('/db/rate', { params });
        return response.data
    },
    async getCars(params) {
        const response = await Api.get('/db/car', { params });
        return response.data
    }
}