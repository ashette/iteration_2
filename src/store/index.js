import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth'
import Category from './entities/category'
import Point from './entities/point'
import Rate from './entities/rate'
import Car from './entities/car'
import Notifications from './notifications'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isDataRequesting: false,
    },
    mutations: {
        requestingData(state) {
            state.isDataRequesting = true
        },
        requestingDataSuccess(state) {
            state.isDataRequesting = false
        },
        requestingDataFailed(state) {
            state.isDataRequesting = false
        }
    },
    getters: {
        isDataRequesting: state => state.isDataRequesting
    },
    modules: {
        Auth,
        Notifications,
        Category,
        Point,
        Rate,
        Car
    }
})