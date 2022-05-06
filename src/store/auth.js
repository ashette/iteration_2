import { api } from '@/service/ApiService'
import MainService from '@/service/MainService'
import router from '../router'

export default {
    namespaced: true,
    state: {
        authStatus: Boolean(localStorage.getItem('authData')),
        isRequesting: false
    },
    actions: {
        async requestLogin({ commit, dispatch }, { username, password }) {
            commit('requestLogin')

            try {
                const authData = await MainService.login(username, password)
                api.setAuthToken(authData.accessToken)
                localStorage.setItem('authData', JSON.stringify(authData))
                commit('requestLoginSuccess', authData)
                router.push('/')
            } catch (error) {
                commit('requestLoginFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Ошибка авторизации'
                }, { root: true });
                throw error
            }
        },
        async requestLogout({ commit }) {
            try {
                const data = await MainService.logout()
                commit('requestLogout')
                localStorage.removeItem('authData')
                router.push('/login')
            } catch (error) {
                console.error(error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Не удалось выполнить выход из учетной записи.'
                }, { root: true });
            }
        }
    },
    mutations: {
        requestLogin(state) {
            state.isRequesting = true
        },
        requestLoginSuccess(state, authData) {
            state.authStatus = true
            state.isRequesting = false
        },
        requestLoginFailed(state, error) {
            state.error = error
            state.isRequesting = false
        },
        requestLogout(state) {
            state.authStatus = false
        }
    },
    getters: {
        getAuthStatus: state => state.authStatus,
        isRequesting: state => state.isRequesting
    }
}