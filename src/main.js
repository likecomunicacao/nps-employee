import Vue from 'vue';
import Vuex from 'vuex';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App';
import router from './router';
import store from './store/store';

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  render: h => h(App),
});

