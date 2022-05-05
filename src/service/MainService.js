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
    }
}