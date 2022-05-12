import MainService from '@/service/MainService'

const getInitialState = () => {
    return {
        isRequesting: false,
        pagination: {
            page: 1,
            limit: 7,
            length: 1,
        },
        points: [],
    }
}
export default {
    namespaced: true,
    state: getInitialState(),
    actions: {
        async requestPoints({ commit, state, dispatch }, params = {}) {
            commit('requestPoints')
            try {
                const { page, limit } = state.pagination
                const requestParams = {
                    page: page - 1,
                    limit,
                    ...params
                }
                const { data: points, count } = await MainService.getPoints(requestParams);
                const newLength = Math.ceil(count / limit);
                commit('setPageLength', newLength)
                if (newLength < page) {
                    dispatch('setCurrentPage', page - 1)
                }
                commit('requestPointsSuccess', points)
                return points
            } catch (error) {
                commit('requestPointsFailed', error)
                throw error
            }
        },
        async createPoint({ commit, dispatch }, { point, params }) {
            commit('requestCreatePoint')
            try {
                const response = await MainService.createPoint(point, params);
                dispatch('requestPoints')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно добавлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestCreatePointFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async updatePoint({ commit, dispatch }, { id, point, params }) {
            commit('requestUpdatePoint')
            try {
                const response = await MainService.updatePoint(id, point, params);
                dispatch('requestPoints')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestUpdatePointFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deletePoint({ commit, dispatch }, { id, params }) {
            commit('requestDeletePoint')
            try {
                const response = await MainService.deletePoint(id, params);
                dispatch('requestPoints')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeletePointFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        setCurrentPage({ commit, dispatch }, value) {
            commit('setPage', value);
            dispatch('requestPoints')
        },
    },
    mutations: {
        requestPoints(state) {
            state.isRequesting = true
        },
        requestPointsSuccess(state, points) {
            state.isRequesting = false
            state.points = points
        },
        requestPointsFailed(state) {
            state.isRequesting = false
        },
        requestUpdatePoint(state) {
            state.isRequesting = true
        },
        requestUpdatePointFailed(state) {
            state.isRequesting = false
        },
        requestCreatePoint(state) {
            state.isRequesting = true
        },
        requestCreatePointFailed(state) {
            state.isRequesting = false
        },
        requestDeletePoint(state) {
            state.isRequesting = true
        },
        requestDeletePointFailed(state) {
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
        resetPoints(state) {
            Object.assign(state, getInitialState())
        }
    },
    getters: {
        isRequesting: state => state.isRequesting,
        points: state => state.points,
        pagination: state => state.pagination
    },

}