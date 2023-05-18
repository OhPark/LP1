import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound404 from '../views/NotFound404.vue'
import CommunityView from '../views/CommunityView.vue'
import ArticleCreateView from '../views/ArticleCreateView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
  {
    path: '/community',
    name: 'CommunityView',
    component: CommunityView,
  },
  {
    path: '/articlecreate',
    name: 'ArticleCreateView',
    component: ArticleCreateView,
  },
  {
    path: '/articledetail',
    name: 'ArticleDetailView',
    component: ArticleDetailView,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
