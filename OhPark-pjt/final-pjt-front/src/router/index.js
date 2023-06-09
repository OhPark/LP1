import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound404 from '../views/NotFound404.vue'
import CommunityView from '../views/CommunityView.vue'
import ArticleCreateView from '../views/ArticleCreateView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import ArticleUpdateView from '../views/ArticleUpdateView.vue'
import ReviewCreate from '@/views/ReviewCreate.vue'
import ReviewUpdate from '@/views/ReviewUpdate'
import WorldcupStart from '@/views/Worldcup/WorldcupStartView'
import ProfileView from '@/views/ProfileView'
import SearchMovie from '@/views/SearchMovie'


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
    path: '/movie/:movie_id/review_create',
    name: 'reviewCreate',
    component: ReviewCreate
  },
  {
    path: '/movie/:movie_id/review/:review_id',
    name: 'reviewDetail',
    component: () => import('@/views/ReviewDetail')
  },
  {
    path: '/movie/:movie_id/review/:review_id/review_update',
    name: 'reviewUpdate',
    component: ReviewUpdate
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
    path: '/articleupdate',
    name: 'ArticleUpdateView',
    component: ArticleUpdateView,
  },
  {
    path: '/community/:article_id',
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
  {
    path: '/worldcupStart',
    name: 'worldcupStart',
    component: WorldcupStart
  },
  {
    path: '/profile/:username',
    name: 'ProfileView',
    component: ProfileView,
  },
  {
    path: '/Finish/:movie_id',
    name: 'worldcupFinish',
    component: () => import('@/views/Worldcup/WorldcupFinishView') 
  },
  {
    path: '/movies/:keyword',
    name: 'movieSearch',
    component: SearchMovie
  },
  {
    path: '*',
    redirect: '/404'
  }
]

// 동적 route 이동할 때 duplicated 에러 회피하기 위한 코드
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
