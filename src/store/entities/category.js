import MainService from '@/service/MainService'

export default {
    namespaced: true,
    actions: {
        async requestCategories({ commit }, { page, limit }) {
            commit('requestingData', {}, { root: true })
            try {
                const response = await MainService.getCategories({ page, limit });
                commit('requestingDataSuccess', {}, { root: true })
                return response
            } catch (e) {
                commit('requestingDataFailed', e, { root: true })
                throw e
            }
        },
    },
}