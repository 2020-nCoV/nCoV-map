import Vue from 'vue';
import VueRouter from 'vue-router';
import Situation from '../views/Situation/index.vue';
import Main from '../App.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '/',
        redirect: '/situation',
      },
      {
        path: '/situation',
        name: 'situation',
        component: Situation,
      },
      {
        path: '/support',
        name: 'support',
        component: () => import(/* webpackChunkName: "support" */ '../views/Support/index.vue'),
      },
      {
        path: '/migrate',
        name: 'migrate',
        component: () => import(/* webpackChunkName: "migrate" */ '../views/Migrate/index.vue'),
      },
      {
        path: '/time-analyse',
        name: 'timeAnalyse',
        component: () => import(/* webpackChunkName: "timeAnalyse" */ '../views/TimeAnalyse/index.vue'),
      },
      {
        path: '/space-analyse',
        name: 'spaceAnalyse',
        component: () => import(/* webpackChunkName: "spaceAnalyse" */ '../views/SpaceAnalyse/index.vue'),
      },
      {
        path: '/drive-analyse',
        name: 'driveAnalyse',
        component: () => import(/* webpackChunkName: "driveAnalyse" */ '../views/DriveAnalyse/index.vue'),
      },
      {
        path: '/public-opinion',
        name: 'publicOpinion',
        component: () => import(/* webpackChunkName: "publicOpinion" */ '../views/PublicOpinion/index.vue'),
      },
      {
        path: '/question',
        name: 'question',
        component: () => import(/* webpackChunkName: "question" */ '../views/Question/index.vue'),
      },
      {
        path: '/statistics',
        name: 'statistics',
        component: () => import(/* webpackChunkName: "statistics" */ '../views/Statistics/index.vue'),
      },
      {
        path: '/alarm',
        name: 'alarm',
        component: () => import(/* webpackChunkName: "alarm" */ '../views/Alarm/index.vue'),
        meta: {
          needLogin: true,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Login/register.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
