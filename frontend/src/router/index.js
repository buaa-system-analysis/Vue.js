import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Menu from '@/components/NavigationBar'
import Card from '@/components/Card'
import User from '@/views/User'
import Purchase from '@/views/Purchase'

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
        {path: 'Card', component: Card},
        {path: 'User', component: User},
        {path: 'Purchase', component: Purchase}
      ]
    }
  ]
})

export default router

// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       components: {
//         default: Index
//       }
//     },
//     {
//       path: '/home',
//       components: {
//         default: Menu
//       },
//       children: [
//         {path: 'Card', component: Card},
//         {path: 'User', component: User},
//         {path: 'Purchase', component: Purchase}
//       ]
//     }
//   ]
// })
