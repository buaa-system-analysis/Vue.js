import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Menu from '@/components/NavigationBar'
import User from '@/views/User'
import Purchase from '@/views/Purchase'
import Search from '@/views/Search'
import ResourceDisplay from '@/views/ResourceDisplay'
import Collection from '@/views/Collection'
import Scholar from '@/views/Scholar'
import ScholarDisplay from '@/views/ScholarDisplay'

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
        {path: '/Search', component: Search},
        {path: '/Resource', component: ResourceDisplay},
        {path: '/Collection', component: Collection},
        {path: '/Scholar', component: Scholar},
        {path: '/ScholarDisplay', component: ScholarDisplay}
      ],
      meta: {
        requireAuth: true
      }
    }
  ]
})
export default router
