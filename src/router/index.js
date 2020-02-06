import Vue from 'vue';
import VueRouter from 'vue-router';
import Alarm from '../views/Alarm/index.vue';
import DriveAnalyse from '../views/DriveAnalyse/index.vue';
import Migrate from '../views/Migrate/index.vue';
import PublicOpinion from '../views/PublicOpinion/index.vue';
import Question from '../views/Question/index.vue';
import Situation from '../views/Situation/index.vue';
import SpaceAnalyse from '../views/SpaceAnalyse/index.vue';
import Statistics from '../views/Statistics/index.vue';
import Support from '../views/Support/index.vue';
import TimeAnalyse from '../views/TimeAnalyse/index.vue';
import Login from '../views/Login/login.vue';
import Register from '../views/Login/register.vue';
import Main from '../App.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    hidden: true,
  },
  {
    path: '/',
    component: Main,
    children: [
      { path: '/situation', component: Situation, name: 'Table' },
    ],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/',
      name: 'situation',
      component: Situation,
    }],

  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/situation',
      name: 'situation',
      component: Situation,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/support',
      name: 'support',
      component: Support,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/migrate',
      name: 'migrate',
      component: Migrate,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/time-analyse',
      name: 'timeAnalyse',
      component: TimeAnalyse,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/space-analyse',
      name: 'spaceAnalyse',
      component: SpaceAnalyse,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/drive-analyse',
      name: 'driveAnalyse',
      component: DriveAnalyse,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/public-opinion',
      name: 'publicOpinion',
      component: PublicOpinion,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/question',
      name: 'question',
      component: Question,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/alarm',
      name: 'alarm',
      component: Alarm,
    }],
  },
  {
    path: '/',
    component: Main,
    children: [{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    }],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
