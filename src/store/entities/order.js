import MainService from '@/service/MainService'

export default {
    namespaced: true,
    state: {
        isOrderRequesting: false,
    },
    actions: {
        async requestOrders({ commit }, params) {
            commit('requestingOrders')
            try {
                const response = await MainService.getOrders(params);
                commit('requestingOrdersSuccess')
                return response
            } catch (error) {
                commit('requestingOrdersFailed', error)
                throw error
            }
        },
        async requestOrderData({ commit }, orderId, params) {
            commit('requestingOrders')
            try {
                const orderData = await MainService.getOrderData(orderId);
                commit('requestingOrdersSuccess')
                return orderData
            } catch (error) {
                commit('requestingOrdersFailed', error)
                throw error
            }
        },
    },
    mutations: {
        requestingOrders(state) {
            state.isOrderRequesting = true
        },
        requestingOrdersSuccess(state) {
            state.isOrderRequesting = false
        },
        requestingOrdersFailed(state) {
            state.isOrderRequesting = false
        }
    },
    getters: {
        isOrderRequesting: state => state.isOrderRequesting
    },
}