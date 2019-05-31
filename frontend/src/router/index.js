import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Menu from '@/components/NavigationBar'
import User from '@/views/User'
import Home from '@/views/Home'
import Search from '@/views/Search'
import ResourceDisplay from '@/views/ResourceDisplay'
import Collection from '@/views/Collection'
import Scholar from '@/views/Scholar'
import PaperList from '@/views/PaperList'
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
        {path: '', component: Home},
        {path: '/User', component: User},
        {path: '/Search', component: Search},
        {path: '/Resource', component: ResourceDisplay},
        {path: '/Collection', component: Collection},
        {path: '/Scholar', component: Scholar},
        {path: '/PaperList', component: PaperList},
        {path: '/ScholarDisplay', component: ScholarDisplay}
      ],
      meta: {
        requireAuth: true
      }
    }
  ]
})
export default router
