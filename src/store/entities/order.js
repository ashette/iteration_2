import MainService from '@/service/MainService'

export default {
    namespaced: true,
    actions: {
        async requestOrders({ commit, dispatch }, { page, limit }) {
            const auth_token = JSON.parse(localStorage.getItem('authData'))['access_token']
            commit('requestingData', {}, { root: true })
            try {                
                const response = await MainService.getOrders({ page, limit }, auth_token);
                commit('requestingDataSuccess', {}, { root: true })
                return response
            } catch (error) {
                commit('requestingDataFailed', error, { root: true })
                throw error
            }
        },
    },

}