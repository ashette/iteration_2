import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import AdminOrders from '../views/Orders.vue'
import CarDetails from '../views/CarDetails.vue'
import Cars from '../views/Cars.vue'
import VCategories from '../views/Category/VCategories.vue'
import VPoints from '../views/Point/VPoints.vue'
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
    component: VCategories,
    meta: { layout: 'admin', auth: true, title: "Категории" },
  },
  {
    path: '/admin/points',
    component: VPoints,
    meta: { layout: 'admin', auth: true, title: "Пункты выдачи" },
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
  routes
})

export default router
