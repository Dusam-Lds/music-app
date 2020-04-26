import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: () => import('components/recommend/recommend')
    },
    {
      path: '/singer',
      component: () => import('components/singer/singer')
    },
    {
      path: '/rank',
      component: () => import('components/rank/rank')
    },
    {
      path: '/search',
      component: () => import('components/search/search')
    }
  ]
})
