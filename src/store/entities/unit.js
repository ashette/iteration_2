import MainService from '@/service/MainService'

const getInitialState = () => {
    return {
        isRequesting: false,
        pagination: {
            page: 1,
            limit: 7,
            length: 1,
        },
        units: [],
    }
}
export default {
    namespaced: true,
    state: getInitialState(),
    actions: {
        async requestUnits({ commit, state, dispatch }, params = {}) {
            commit('requestUnits')
            try {
                const { page, limit } = state.pagination
                const requestParams = {
                    page: page - 1,
                    limit,
                    ...params
                }
                const { data: units, count } = await MainService.getUnits(requestParams);
                const newLength = Math.ceil(count / limit);
                commit('setPageLength', newLength)
                if (newLength < page) {
                    dispatch('setCurrentPage', page - 1)
                }
                commit('requestUnitsSuccess', units)
                return units
            } catch (error) {
                commit('requestUnitsFailed', error)
                throw error
            }
        },
        async createUnit({ commit, dispatch }, { unit, params }) {
            commit('requestCreateUnit')
            try {
                const response = await MainService.createUnit(unit, params);
                dispatch('requestUnits')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно добавлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestCreateUnitFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async updateUnit({ commit, dispatch }, { id, unit, params }) {
            commit('requestUpdateUnit')
            try {
                const response = await MainService.updateUnit(id, unit, params);
                dispatch('requestUnits')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestUpdateUnitFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteUnit({ commit, dispatch }, { id, params }) {
            commit('requestDeleteUnit')
            try {
                const response = await MainService.deleteUnit(id, params);
                dispatch('requestUnits')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeleteUnitFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        setCurrentPage({ commit, dispatch }, value) {
            commit('setPage', value);
            dispatch('requestUnits')
        },
        resetUnits({ commit }) {
            commit('resetUnits')
        }
    },
    mutations: {
        requestUnits(state) {
            state.isRequesting = true
        },
        requestUnitsSuccess(state, units) {
            state.isRequesting = false
            state.units = units
        },
        requestUnitsFailed(state) {
            state.isRequesting = false
        },
        requestUpdateUnit(state) {
            state.isRequesting = true
        },
        requestUpdateUnitFailed(state) {
            state.isRequesting = false
        },
        requestCreateUnit(state) {
            state.isRequesting = true
        },
        requestCreateUnitFailed(state) {
            state.isRequesting = false
        },
        requestDeleteUnit(state) {
            state.isRequesting = true
        },
        requestDeleteUnitFailed(state) {
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
        resetUnits(state) {
            Object.assign(state, getInitialState())
        }
    },
    getters: {
        isRequesting: state => state.isRequesting,
        units: state => state.units,
        pagination: state => state.pagination
    },
}