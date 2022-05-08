import MainService from '@/service/MainService'

export default {
    namespaced: true,
    state: {
        isRequesting: false,
        categories: [],
    },
    actions: {
        async requestCategories({ commit }, params) {
            commit('requesting')
            try {
                const response = await MainService.getCategories(params);
                commit('setCategories', response.data)
                commit('requestingSuccess')
                return response
            } catch (error) {
                commit('requestingFailed', error)
                throw error
            }
        },
        async createCategory({ commit, dispatch }, { category, params }) {
            commit('requesting')
            try {
                const response = await MainService.createCategory(category, params);
                commit('setCategory', response.data)
                commit('requestingSuccess')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно добавлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestingFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async updateCategory({ commit, dispatch }, { id, category, params }) {
            commit('requesting')
            try {
                const response = await MainService.updateCategory(id, category, params);
                commit('updateCategory', response.data)
                commit('requestingSuccess')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestingFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteCategory({ commit, dispatch }, { id, params }) {
            commit('requesting')
            try {
                const response = await MainService.deleteCategory(id, params);
                commit('removeDeletedCategory', id)
                commit('requestingSuccess')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestingFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        }
    },
    mutations: {
        requesting(state) {
            state.isRequesting = true
        },
        requestingSuccess(state) {
            state.isRequesting = false
        },
        requestingFailed(state) {
            state.isRequesting = false
        },
        setCategories(state, categories) {
            state.categories = categories
        },
        setCategory: (state, category) => {
            state.categories.push(category)
        },
        updateCategory: (state, category) => {
            state.categories = state.categories.map(item => {
                if (item.id == category.id) {
                    item = category
                }
                return item
            })
        },
        removeDeletedCategory: (state, id) => {
            state.categories = state.categories.filter(item => item.id !== id);
        }
    },
    getters: {
        isRequesting: state => state.isRequesting,
        categories: state => state.categories
    },
}