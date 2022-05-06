import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import './plugins/vee-validate'
import DatetimePicker from 'vuetify-datetime-picker'


Vue.config.productionTip = false
Vue.use(DatetimePicker)

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
