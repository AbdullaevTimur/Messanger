import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Messanger',
    component: () => import('@/views/Messanger'),
    children: [
      {
        path: '/chat/:id',
        name: 'Chat',
        component: () => import('@/views/Chat'),
        props: true,
        meta: {
          requiresAuth: true,
          shema: 'light'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
