import MainService from '@/service/MainService'

export default {
    namespaced: true,
    state: {
        authStatus: Boolean(localStorage.getItem('authData')),
        authData: JSON.parse(localStorage.getItem('authData')) || null,
        isRequesting: false
    },
    actions: {
        async requestLogin({ commit, dispatch }, { username, password }) {
            commit('requestLogin')

            try {
                const authData = await MainService.login(username, password)
                localStorage.setItem('authData', JSON.stringify(authData))
                commit('requestLoginSuccess', authData)
            } catch (e) {
                commit('requestLoginFailed', e)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Ошибка авторизации'
                }, { root: true });
                throw e
            }
        },
        async requestLogout({ commit }) {
            commit('requestLogout')
            localStorage.removeItem('authData')
        }
    },
    mutations: {
        requestLogin(state) {
            state.isRequesting = true
        },
        requestLoginSuccess(state, authData) {
            state.authStatus = true
            state.authData = authData
            state.isRequesting = false
        },
        requestLoginFailed(state, error) {
            state.error = error
            state.isRequesting = false
        },
        requestLogout(state) {
            state.authStatus = false
            state.authData = null
        }
    },
    getters: {
        getAuthStatus: state => state.authStatus,
        getAuthData: state => state.authData,
        isRequesting: state => state.isRequesting
    }
}