import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Login from '../views/Login.vue'
import VOrders from '../views/Order/VOrders.vue'
import VOrder from '../views/Order/VOrder.vue'
import VCars from '../views/Car/VCars.vue'
import VCar from '../views/Car/VCar.vue'
import VNewCar from '../views/Car/VNewCar.vue'
import VCategories from '../views/Category/VCategories.vue'
import VPoints from '../views/Point/VPoints.vue'
import VRates from '../views/Rate/VRates.vue'
import VUnits from '../views/Unit/VUnits.vue'
import VCities from '../views/City/VCities.vue'
import PageNotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'main' },
  },
  {
    path: '/',
    redirect: { name: 'AdminOrders' }
  },
  {
    path: '/admin',
    redirect: { name: 'AdminOrders' }
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: VOrders,
    name: 'AdminOrders',
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
    name: 'AdminCars',
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
    path: '/admin/cities',
    component: VCities,
    meta: { layout: 'admin', auth: true, title: "Города" },
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
    path: '/admin/units',
    component: VUnits,
    meta: { layout: 'admin', auth: true, title: "Типы тарифов" },
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

router.beforeEach((to, from, next) => {
  const authStatus = store.getters['Auth/getAuthStatus'];
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (authStatus) {
    !requireAuth ? next('/') : next()
  } else {
    requireAuth ? next('/login') : next()
  }
})

export default router
