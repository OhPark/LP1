import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound404 from '@/views/NotFound404'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie/:movie_id',
    name: 'movieDetail',
    component: () => import('../views/MovieDetail.vue'),
  },
  {
    path: '/404-not-found',
    name: 'NotFound404',
    component: NotFound404,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
