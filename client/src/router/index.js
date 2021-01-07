import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'


const ifNotAuthenticated = async (to, from, next) => {
  await store.dispatch("auth/AUTH")
  if (store.getters["auth/AUTH_STATUS"]) {
    next()
    return
  }
  next('/login')
}

const ifAuthenticated = async (to, from, next) => {
  await store.dispatch("auth/AUTH")
  if (store.getters["auth/AUTH_STATUS"]) {
    next('/')
    return
  }
  next()
}



Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'c-login',
      meta: { layout: 'empty' },
      beforeEnter: ifAuthenticated,
      component: () => import('@/components/Auth/c-auth')
    },
    {
      path: '/sign-up',
      name: 'c-registration',
      meta: { layout: 'empty' },
      beforeEnter: ifAuthenticated,
      component: () => import('@/components/Auth/c-registration')
    },
    {
      path: '/',
      name: 'c-disk',
      meta: { layout: 'main' },
      beforeEnter: ifNotAuthenticated,
      component: () => import('@/components/Disk/c-disk.vue')
    },
  ]
})
