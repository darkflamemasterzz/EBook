import Vue from 'vue'
import VueRouter from 'vue-router'
import Ebook from '@/Ebook'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: Ebook
    }
  ]
})

export default router
