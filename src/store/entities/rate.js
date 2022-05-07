import MainService from '@/service/MainService'

export default {
    namespaced: true,
    state: {
        isRateRequesting: false,
    },
    actions: {
        async requestRates({ commit }, params) {
            commit('requestingRates')
            try {
                const response = await MainService.getRates(params);
                commit('requestingRatesSuccess')
                return response
            } catch (error) {
                commit('requestingRatesFailed', error)
                throw error
            }
        },
    },
    mutations: {
        requestingRates(state) {
            state.isRateRequesting = true
        },
        requestingRatesSuccess(state) {
            state.isRateRequesting = false
        },
        requestingRatesFailed(state) {
            state.isRateRequesting = false
        }
    },
    getters: {
        isRateRequesting: state => state.isRateRequesting
    },
}