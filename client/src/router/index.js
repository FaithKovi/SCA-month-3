import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard/students',
    name: 'Dashboard',
    component: () => import('../views/dashboard/Index.vue'),

  },
  {
    path: '/dashboard/student/:studentId',
    name: 'Student',
    component: () =>
      import("../views/dashboard/Student.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.isUserLoggedIn) {
    next({
      name: 'Login'
    });
  } else {
    next();
  }
})

export default router