import Vue from 'vue'
import VueRouter from 'vue-router'
import Ebook from '@/Ebook'
import EbookReader from '@/components/ebook/EbookReader'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/ebook'
    },
    {
      path: '/ebook',
      component: Ebook,
      children: [
        {
          path: ':filePath',
          component: EbookReader
        }
      ]
    }
  ]
})

export default router
