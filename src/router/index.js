import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Repo from '../views/Repo.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile/:userID',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
  },
  {
    path: '/repo/',
    name: 'Repo',
    component: Repo,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
