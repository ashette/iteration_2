import MainService from '@/service/MainService'

export default {
    namespaced: true,
    actions: {
        async requestPoints({ commit, dispatch }, { page, limit }) {
            commit('requestingData', {}, { root: true })
            try {
                const response = await MainService.getPoints({ page, limit });
                commit('requestingDataSuccess', {}, { root: true })
                return response
            } catch (error) {
                commit('requestingDataFailed', error, { root: true })
                throw error
            }
        },
    },

}