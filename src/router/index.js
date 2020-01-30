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

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'situation',
    component: Situation,
  },
  {
    path: '/situation',
    name: 'situation',
    component: Situation,
  },
  {
    path: '/support',
    name: 'support',
    component: Support,
  },
  {
    path: '/migrate',
    name: 'migrate',
    component: Migrate,
  },
  {
    path: '/time-analyse',
    name: 'timeAnalyse',
    component: TimeAnalyse,
  },
  {
    path: '/space-analyse',
    name: 'spaceAnalyse',
    component: SpaceAnalyse,
  },
  {
    path: '/drive-analyse',
    name: 'driveAnalyse',
    component: DriveAnalyse,
  },
  {
    path: '/public-opinion',
    name: 'publicOpinion',
    component: PublicOpinion,
  },
  {
    path: '/question',
    name: 'question',
    component: Question,
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics,
  },
  {
    path: '/alarm',
    name: 'alarm',
    component: Alarm,
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
