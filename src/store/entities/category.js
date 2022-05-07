import MainService from '@/service/MainService'

export default {
    namespaced: true,
    state: {
        isCategoryRequesting: false,
    },
    actions: {
        async requestCategories({ commit }, params) {
            commit('requestingCategories')
            try {
                const response = await MainService.getCategories(params);
                commit('requestingCategoriesSuccess')
                return response
            } catch (error) {
                commit('requestingDataFailed', error)
                throw error
            }
        },
    },
    mutations: {
        requestingCategories(state) {
            state.isCategoryRequesting = true
        },
        requestingCategoriesSuccess(state) {
            state.isCategoryRequesting = false
        },
        requestingCategoriesFailed(state) {
            state.isCategoryRequesting = false
        }
    },
    getters: {
        isCategoryRequesting: state => state.isCategoryRequesting
    },
}