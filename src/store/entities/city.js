import MainService from '@/service/MainService'

const getInitialState = () => {
    return {
        isRequesting: false,
        pagination: {
            page: 1,
            limit: 7,
            length: 1,
        },
        cities: [],
    }
}
export default {
    namespaced: true,
    state: getInitialState(),
    actions: {
        async requestCities({ commit, state, dispatch }, params = {}) {
            commit('requestCities')
            try {
                const { page, limit } = state.pagination
                const requestParams = {
                    page: page - 1,
                    limit,
                    ...params
                }
                const { data: cities, count } = await MainService.getCities(requestParams);
                const newLength = Math.ceil(count / limit);
                commit('setPageLength', newLength)
                if (newLength < page) {
                    dispatch('setCurrentPage', page - 1)
                }
                commit('requestCitiesSuccess', cities)
                return cities
            } catch (error) {
                commit('requestCitiesFailed', error)
                throw error
            }
        },
        async createCity({ commit, dispatch }, { city, params }) {
            commit('requestCreateCity')
            try {
                const response = await MainService.createCity(city, params);
                dispatch('requestCities')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно добавлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestCreateCityFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async updateCity({ commit, dispatch }, { id, city, params }) {
            commit('requestUpdateCity')
            try {
                const response = await MainService.updateCity(id, city, params);
                dispatch('requestCities')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestUpdateCityFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteCity({ commit, dispatch }, { id, params }) {
            commit('requestDeleteCity')
            try {
                const response = await MainService.deleteCity(id, params);
                dispatch('requestCities')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeleteCityFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        setCurrentPage({ commit, dispatch }, value) {
            commit('setPage', value);
            dispatch('requestCities')
        },
    },
    mutations: {
        requestCities(state) {
            state.isRequesting = true
        },
        requestCitiesSuccess(state, cities) {
            state.isRequesting = false
            state.cities = cities
        },
        requestCitiesFailed(state) {
            state.isRequesting = false
        },
        requestUpdateCity(state) {
            state.isRequesting = true
        },
        requestUpdateCityFailed(state) {
            state.isRequesting = false
        },
        requestCreateCity(state) {
            state.isRequesting = true
        },
        requestCreateCityFailed(state) {
            state.isRequesting = false
        },
        requestDeleteCity(state) {
            state.isRequesting = true
        },
        requestDeleteCityFailed(state) {
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
        resetCities(state) {
            Object.assign(state, getInitialState())
        }
    },
    getters: {
        isRequesting: state => state.isRequesting,
        cities: state => state.cities,
        pagination: state => state.pagination
    },
}