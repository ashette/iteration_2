import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import VOrders from '../views/Order/VOrders.vue'
import VOrder from '../views/Order/VOrder.vue'
import VCars from '../views/Car/VCars.vue'
import VCar from '../views/Car/VCar.vue'
import VNewCar from '../views/Car/VNewCar.vue'
import VCategories from '../views/Category/VCategories.vue'
import VPoints from '../views/Point/VPoints.vue'
import VRates from '../views/Rate/VRates.vue'
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
    component: VOrders,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/orders/:id',
    name: 'EditOrder',
    component: VOrder,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/cars',
    component: VCars,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/cars/:id',
    name: 'EditCar',
    component: VCar,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/add-car/',
    name: 'AddCar',
    component: VNewCar,
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
    component: VRates,
    meta: { layout: 'admin', auth: true, title: "Тарифы" },
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFound,
    meta: { layout: 'admin', auth: true },
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
