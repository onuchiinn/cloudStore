import Vue from 'vue'
import VueRouter from 'vue-router'




Vue.use(VueRouter)

export default new VueRouter({
  //на продакшене убрать
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'c-login',
      meta: { layout: 'empty' },
      component: () => import('@/components/Auth/c-auth')
    },
    {
      path: '/sign-up',
      name: 'c-registration',
      meta: { layout: 'empty' },
      component: () => import('@/components/Auth/c-registration')
    },
    {
      path: '/',
      name: 'c-disk',
      meta: { layout: 'main' },
      component: () => import('@/components/Disk/c-disk.vue')
    },
  ]
})
