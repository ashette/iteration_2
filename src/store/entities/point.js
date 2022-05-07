import MainService from '@/service/MainService'

export default {
    namespaced: true,
    state: {
        isPointRequesting: false,
        isCityRequesting: false,
    },
    actions: {
        async requestPoints({ commit }, params) {
            commit('requestingPoints')
            try {
                const response = await MainService.getPoints(params);
                commit('requestingPointsSuccess')
                return response
            } catch (error) {
                commit('requestingPointsFailed', error)
                throw error
            }
        },
        async requestCities({ commit }, params) {
            commit('requestingCities')
            try {
                const response = await MainService.getCities(params);
                commit('requestingCitiesSuccess')
                return response
            } catch (error) {
                commit('requestingCitiesFailed', error)
                throw error
            }
        },
    },
    mutations: {
        requestingPoints(state) {
            state.isPointRequesting = true
        },
        requestingPointsSuccess(state) {
            state.isPointRequesting = false
        },
        requestingPointsFailed(state) {
            state.isPointRequesting = false
        },
        requestingCities(state) {
            state.isCityRequesting = true
        },
        requestingCitiesSuccess(state) {
            state.isCityRequesting = false
        },
        requestingCitiesFailed(state) {
            state.isCityRequesting = false
        }
    },
    getters: {
        isPointRequesting: state => state.isPointRequesting,
        isCityRequesting: state => state.isCityRequesting
    },

}