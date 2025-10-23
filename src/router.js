import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'
import Game from './components/Game.vue'
import User from './components/User.vue'
import Ranking from './components/Ranking.vue'
import Login from './components/Login.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/game', component: Game, meta: { requiresAuth: true } },
    { path: '/user', component: User, meta: { requiresAuth: true } },
    { path: '/ranking', component: Ranking },
    { path: '/login', component: Login }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('user')) {
    next('/login')
  } else {
    next()
  }
})

export default router