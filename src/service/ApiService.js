import axios from 'axios'
import store from '../store'

export class Api {

    constructor(config) {
        if (!config.baseURL) {
            throw new Error('baseURL cannot be empty')
        }

        this.client = axios.create({
            baseURL: config.baseURL,
            headers: config.headers,
        })

        this.setup()
    }

    setAuthToken(token) {
        this.client.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    setup() {
        this.client.interceptors.request.use(async request => {
            return request
        })

        this.client.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    store.dispatch("Auth/requestLogout");
                }

                return error
            }
        )
    }
}

export const api = new Api({
    baseURL: `https://api-factory.simbirsoft1.com/api`,
    headers: {
        'X-Api-Factory-Application-Id': process.env.VUE_APP_ID,
    }
})
