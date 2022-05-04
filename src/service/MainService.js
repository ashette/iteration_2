import Api from '@/service/ApiService'
import { castAuth } from '../helpers';

export default {
    async login(username, password) {
        const { data } = await Api.post('/auth/login', { username, password });
        return castAuth(data)
    }
}