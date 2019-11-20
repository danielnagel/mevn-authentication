import Vue from 'vue';
import axios from 'axios';
// @ts-ignore
import App from './App.vue';
import router from './router';

Vue.prototype.$http = axios;

const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token;
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
