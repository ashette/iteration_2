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
        orders: [],
        orderData: {},
        filters: {}
    }
}
export default {
    namespaced: true,
    state: getInitialState(),
    actions: {
        async requestOrders({ commit, state, dispatch }, params = {}) {
            commit('requestOrders')
            try {
                const { page, limit } = state.pagination
                const requestParams = {
                    page: page - 1,
                    limit,
                    ...state.filters,
                    ...params
                }
                const { data: orders, count } = await MainService.getOrders(requestParams);
                let newLength = Math.ceil(count / limit) || 1;
                commit('setPageLength', newLength)
                if (newLength < page) {
                    dispatch('setCurrentPage', page - 1)
                }
                commit('requestOrdersSuccess', orders)
                return orders
            } catch (error) {
                commit('requestOrdersFailed', error)
                throw error
            }
        },
        async requestOrderData({ commit }, orderId) {
            commit('requestOrderData')
            try {
                const orderData = await MainService.getOrderData(orderId);
                commit('requestOrderDataSuccess', orderData)
                return orderData
            } catch (error) {
                commit('requestOrderDataFailed', error)
                throw error
            }
        },
        async updateOrder({ commit, dispatch }, { id, order, params }) {
            commit('requestUpdateOrder')
            try {
                const response = await MainService.updateOrder(id, order, params);
                dispatch('requestOrderData', id)
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно обновлено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestUpdateOrderFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteOrder({ commit, dispatch }, { id, params }) {
            commit('requestDeleteOrder')
            try {
                const response = await MainService.deleteOrder(id, params);
                router.push({ name: 'AdminOrders' })
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeleteOrderFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        async deleteOrderFromList({ commit, dispatch }, { id, params }) {
            commit('requestDeleteOrder')
            try {
                const response = await MainService.deleteOrder(id, params);
                dispatch('requestOrders')
                dispatch('Notifications/addNotification', {
                    type: 'success',
                    message: 'Успешно удалено!'
                }, { root: true });
                return response
            } catch (error) {
                commit('requestDeleteOrderFailed', error)
                dispatch('Notifications/addNotification', {
                    type: 'error',
                    message: 'Произошла ошибка.'
                }, { root: true });
                throw error
            }
        },
        setCurrentPage({ commit, dispatch }, value) {
            commit('setPage', value);
            dispatch('requestOrders')
        },
        setFilter({ commit, dispatch }, params = {}) {
            commit('setFilter', params);
            dispatch('requestOrders')
        },
        resetFilter({ commit, dispatch }) {
            commit('resetFilter');
            dispatch('requestOrders')
        },
    },
    mutations: {
        requestOrders(state) {
            state.isRequesting = true
        },
        requestOrdersSuccess(state, orders) {
            state.isRequesting = false
            state.orders = orders
        },
        requestOrdersFailed(state) {
            state.isRequesting = false
        },
        requestOrderData(state) {
            state.isRequesting = true
        },
        requestOrderDataSuccess(state, orderData) {
            state.isRequesting = false
            state.orderData = orderData
        },
        requestOrderDataFailed(state) {
            state.isRequesting = false
        },
        requestUpdateOrder(state) {
            state.isRequesting = true
        },
        requestUpdateOrderFailed(state) {
            state.isRequesting = false
        },
        requestDeleteOrder(state) {
            state.isRequesting = true
        },
        requestDeleteOrderFailed(state) {
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
        resetOrders(state) {
            Object.assign(state, getInitialState())
        },
        resetOrder(state) {
            state.orderData = {}
        }
    },
    getters: {
        isRequesting: state => state.isRequesting,
        orders: state => state.orders,
        orderData: state => state.orderData,
        pagination: state => state.pagination
    },
}