import MainService from '@/service/MainService'

const getInitialState = () => {
    return {
        isRequesting: false,
        pagination: {
            page: 1,
            limit: 7,
            length: 1,
        },
        categories: [],
    }
}
export default {
    namespaced: true,
    state: getInitialState(),
    actions: {
        async requestCategories({ commit, state, dispatch }, params = {}) {
            commit('requestCategories')
            try {
                const { page, limit } = state.pagination
                const requestParams = {
                    page: page - 1,
                    limit,
                    ...params
                }
                const { data: categories, count } = await MainService.getCategories(requestParams);
                const newLength = Math.ceil(count / limit);
                commit('setPageLength', newLength)
                if (newLength < page) {
                    dispatch('setCurrentPage', page - 1)
                }
                commit('requestCategoriesSuccess', categories)
                return categories
            } catch (error) {
                commit('requestCategoriesFailed', error)
                throw error
            }
        },
        async createCategory({ commit, dispatch }, { category, params }) {
            commit('requestCreateCategory')
            try {
                const response = await MainService.createCategory(category, params);
                dispatch('requestCategories')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно добавлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestCreateCategoryFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async updateCategory({ commit, dispatch }, { id, category, params }) {
            commit('requestUpdateCategory')
            try {
                const response = await MainService.updateCategory(id, category, params);
                dispatch('requestCategories')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestUpdateCategoryFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteCategory({ commit, dispatch }, { id, params }) {
            commit('requestDeleteCategory')
            try {
                const response = await MainService.deleteCategory(id, params);
                dispatch('requestCategories')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeleteCategoryFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        setCurrentPage({ commit, dispatch }, value) {
            commit('setPage', value);
            dispatch('requestCategories')
        },
        resetCategories({ commit }) {
            commit('resetCategories')
        }
    },
    mutations: {
        requestCategories(state) {
            state.isRequesting = true
        },
        requestCategoriesSuccess(state, categories) {
            state.isRequesting = false
            state.categories = categories
        },
        requestCategoriesFailed(state) {
            state.isRequesting = false
        },
        requestUpdateCategory(state) {
            state.isRequesting = true
        },
        requestUpdateCategoryFailed(state) {
            state.isRequesting = false
        },
        requestCreateCategory(state) {
            state.isRequesting = true
        },
        requestCreateCategoryFailed(state) {
            state.isRequesting = false
        },
        requestDeleteCategory(state) {
            state.isRequesting = true
        },
        requestDeleteCategoryFailed(state) {
            state.isRequesting = false
        },
        setPageLength(state, length) {
            state.pagination = {
                ...state.pagination,
                length
            }
        },
        setPage(state, page) {
            state.pagination = {
                ...state.pagination,
                page
            }
        },
        resetCategories(state) {
            Object.assign(state, getInitialState())
        }
    },
    getters: {
        isRequesting: state => state.isRequesting,
        categories: state => state.categories,
        pagination: state => state.pagination
    },
}