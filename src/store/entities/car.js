import MainService from '@/service/MainService'
import router from '@/router'

const getInitialState = () => {
    return {
        isRequesting: false,
        pagination: {
            page: 1,
            limit: 7,
            length: 1,
        },
        cars: [],
        carData: {},
        filters: {}
    }
}
export default {
    namespaced: true,
    state: getInitialState(),
    actions: {
        async requestCars({ commit, state, dispatch }, params = {}) {
            commit('requestCars')
            try {
                const { page, limit } = state.pagination
                const requestParams = {
                    page: page - 1,
                    limit,
                    ...state.filters,
                    ...params
                }
                const { data: cars, count } = await MainService.getCars(requestParams);
                const newLength = Math.ceil(count / limit) || 1;
                commit('setPageLength', newLength)
                if (newLength < page) {
                    dispatch('setCurrentPage', page - 1)
                }
                commit('requestCarsSuccess', cars)
                return cars
            } catch (error) {
                commit('requestCarsFailed', error)
                throw error
            }
        },
        async requestCarData({ commit }, carId) {
            commit('requestCarData')
            try {
                const carData = await MainService.getCarData(carId);
                commit('requestCarDataSuccess', carData)
                return carData
            } catch (error) {
                commit('requestCarDataFailed', error)
                throw error
            }
        },
        async createCar({ commit, dispatch }, { car, params }) {
            commit('requestCreateCar')
            try {
                const { data: carData } = await MainService.createCar(car, params);
                router.push({ name: 'EditCar', params: { id: carData.id } })
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return carData
            } catch (error) {
                commit('requestCreateCarFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async updateCar({ commit, dispatch }, { id, car, params }) {
            commit('requestUpdateCar')
            try {
                const response = await MainService.updateCar(id, car, params);
                dispatch('requestCarData', id)
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestUpdateCarFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteCar({ commit, dispatch }, { id, params }) {
            commit('requestDeleteCar')
            try {
                const response = await MainService.deleteCar(id, params);
                router.push({ name: 'AdminCars' })
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeleteCarFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteCarFromList({ commit, dispatch }, { id, params }) {
            commit('requestDeleteCar')
            try {
                const response = await MainService.deleteCar(id, params);
                dispatch('requestCars')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeleteCarFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        setCurrentPage({ commit, dispatch }, value) {
            commit('setPage', value);
            dispatch('requestCars')
        },
        setFilter({ commit, dispatch }, params = {}) {
            commit('setFilter', params);
            dispatch('requestCars')
        },
        resetFilter({ commit, dispatch }) {
            commit('resetFilter');
            dispatch('requestCars')
        },
        resetCars({ commit }) {
            commit('resetCars')
        },
        resetCar({ commit }) {
            commit('resetCar')
        }
    },
    mutations: {
        requestCars(state) {
            state.isRequesting = true
        },
        requestCarsSuccess(state, cars) {
            state.isRequesting = false
            state.cars = cars
        },
        requestCarsFailed(state) {
            state.isRequesting = false
        },
        requestCarData(state) {
            state.isRequesting = true
        },
        requestCarDataSuccess(state, carData) {
            state.isRequesting = false
            state.carData = carData
        },
        requestCarDataFailed(state) {
            state.isRequesting = false
        },
        requestCreateCar(state) {
            state.isRequesting = true
        },
        requestCreateCarFailed(state) {
            state.isRequesting = false
        },
        requestUpdateCar(state) {
            state.isRequesting = true
        },
        requestUpdateCarFailed(state) {
            state.isRequesting = false
        },
        requestDeleteCar(state) {
            state.isRequesting = true
        },
        requestDeleteCarFailed(state) {
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
        setFilter(state, filter) {
            state.filters = filter
        },
        resetFilter(state) {
            state.filters = {}
        },
        resetCars(state) {
            Object.assign(state, getInitialState())
        },
        resetCar(state) {
            state.carData = {}
        }
    },
    getters: {
        isRequesting: state => state.isRequesting,
        cars: state => state.cars,
        carData: state => state.carData,
        pagination: state => state.pagination
    },

}