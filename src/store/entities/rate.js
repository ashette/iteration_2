import MainService from '@/service/MainService'

const getInitialState = () => {
    return {
        isRequesting: false,
        pagination: {
            page: 1,
            limit: 7,
            length: 1,
        },
        rates: [],
    }
}
export default {
    namespaced: true,
    state: getInitialState(),
    actions: {
        async requestRates({ commit, state, dispatch }, params = {}) {
            commit('requestRates')
            try {
                const { page, limit } = state.pagination
                const requestParams = {
                    page: page - 1,
                    limit,
                    ...params
                }
                const { data: rates, count } = await MainService.getRates(requestParams);
                const newLength = Math.ceil(count / limit);
                commit('setPageLength', newLength)
                if (newLength < page) {
                    dispatch('setCurrentPage', page - 1)
                }
                commit('requestRatesSuccess', rates)
                return rates
            } catch (error) {
                commit('requestRatesFailed', error)
                throw error
            }
        },
        async createRate({ commit, dispatch }, { rate, params }) {
            commit('requestCreateRate')
            try {
                const response = await MainService.createRate(rate, params);
                dispatch('requestRates')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно добавлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestCreateRateFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async updateRate({ commit, dispatch }, { id, rate, params }) {
            commit('requestUpdateRate')
            try {
                const response = await MainService.updateRate(id, rate, params);
                dispatch('requestRates')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestUpdateRateFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteRate({ commit, dispatch }, { id, params }) {
            commit('requestDeleteRate')
            try {
                const response = await MainService.deleteRate(id, params);
                dispatch('requestRates')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeleteRateFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        setCurrentPage({ commit, dispatch }, value) {
            commit('setPage', value);
            dispatch('requestRates')
        },
    },
    mutations: {
        requestRates(state) {
            state.isRequesting = true
        },
        requestRatesSuccess(state, rates) {
            state.isRequesting = false
            state.rates = rates
        },
        requestRatesFailed(state) {
            state.isRequesting = false
        },
        requestUpdateRate(state) {
            state.isRequesting = true
        },
        requestUpdateRateFailed(state) {
            state.isRequesting = false
        },
        requestCreateRate(state) {
            state.isRequesting = true
        },
        requestCreateRateFailed(state) {
            state.isRequesting = false
        },
        requestDeleteRate(state) {
            state.isRequesting = true
        },
        requestDeleteRateFailed(state) {
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
        resetRates(state) {
            Object.assign(state, getInitialState())
        }
    },
    getters: {
        isRequesting: state => state.isRequesting,
        rates: state => state.rates,
        pagination: state => state.pagination
    },
}