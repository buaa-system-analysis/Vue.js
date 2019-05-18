import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Menu from '@/components/NavigationBar'
import User from '@/views/User'
import Purchase from '@/views/Purchase'
import Search from '@/views/Search'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        default: Index
      }
    },
    {
      path: '/home',
      components: {
        default: Menu
      },
      children: [
        {path: '/User', component: User},
        {path: '/Purchase', component: Purchase},
        {path: '/Search', component: Search}
      ],
      meta: {
        requireAuth: true
      }
    }
  ]
})
export default router
