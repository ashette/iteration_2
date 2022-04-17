import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import AdminOrders from '../views/Orders.vue'
import CarDetails from '../views/CarDetails.vue'
import Cars from '../views/Cars.vue'
import Categories from '../views/Categories.vue'
import Points from '../views/Points.vue'
import Rates from '../views/Rates.vue'
import PageNotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'main', auth: true },
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/car/',
    name: 'CarDetails',
    component: CarDetails,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/cars',
    name: 'Cars',
    component: Cars,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/categories',
    name: 'Categories',
    component: Categories,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/points',
    name: 'Points',
    component: Points,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/rates',
    name: 'Rates',
    component: Rates,
    meta: { layout: 'admin', auth: true },
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
