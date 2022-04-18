import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import PageNotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFound
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  base: location.pathname,
  // mode: 'history',
  routes
})

export default router
