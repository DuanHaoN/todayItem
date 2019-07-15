import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Notfound from '@/views/404'
import Article from '@/views/article'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      // name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article }
      ]
    },
    { name: 'notFound', path: '*', component: Notfound }

  ]
})

// vue-router的导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const user = window.sessionStorage.getItem('dhn')
  if (user) return next()
  next('/login')
})

export default router
