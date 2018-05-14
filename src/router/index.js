import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';
import Details from '@/components/Details';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
    {
      path: '/detalhes/:userId',
      name: 'detalhes',
      component: Details,
    },
  ],
});
