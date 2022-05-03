import Api from '@/service/ApiService'

export default {
    async login(username, password) {
        const response = await Api.post('/auth/login', { username, password });
        return response.data
    }
}