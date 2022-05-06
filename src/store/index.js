import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth'
import Notifications from './notifications'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Auth,
        Notifications
    }
})