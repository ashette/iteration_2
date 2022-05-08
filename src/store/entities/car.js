import MainService from '@/service/MainService'

export default {
    namespaced: true,
    state: {
        isCarRequesting: false,
    },
    actions: {
        async requestCars({ commit }, params) {
            commit('requestingCars')
            try {
                const response = await MainService.getCars(params);
                commit('requestingCarsSuccess')
                return response
            } catch (error) {
                commit('requestingCarsFailed', error)
                throw error
            }
        },
        async requestCarData({ commit }, carId, params) {
            commit('requestingCars')
            try {
                const response = await MainService.getCarData(carId, params);
                commit('requestingCarsSuccess')
                return response
            } catch (error) {
                commit('requestingCarsFailed', error)
                throw error
            }
        },
    },
    mutations: {
        requestingCars(state) {
            state.isCarRequesting = true
        },
        requestingCarsSuccess(state) {
            state.isCarRequesting = false
        },
        requestingCarsFailed(state) {
            state.isCarRequesting = false
        }
    },
    getters: {
        isCarRequesting: state => state.isCarRequesting
    },

}