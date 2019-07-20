import Vue from 'vue'

import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Notfound from '@/views/404'
import Article from '@/views/article'
import Image from '@/views/material'
import Publish from '@/views/publish'
import Demo from '@/views/demo'
import comment from '@/views/comment'
import setting from '@/views/setting'
import fans from '@/views/fans'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { name: 'demo', path: '/demo', component: Demo },
    {
      // name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comment', path: '/comment', component: comment },
        { name: 'setting', path: '/setting', component: setting },
        { name: 'fans', path: '/fans', component: fans }
      ]
    },
    { name: 'notFound', path: '*', component: Notfound }

  ]
})

// vue-router的导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/demo') return next()
  const user = window.sessionStorage.getItem('dhn')
  if (user) return next()
  next('/login')
})

export default router
