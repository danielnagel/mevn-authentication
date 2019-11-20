import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

// @ts-ignore
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') || '',
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, payload) {
      state.status = 'success';
      state.token = payload.token;
      state.username = payload.username;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
      state.username = '';
    },
  },
  actions: {
    login({ commit }, userLogin) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        const { email, password } = userLogin;
        axios
          // @ts-ignore
          .post('http://localhost:4000/login', { email, password })
          .then((res) => {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', user.username);
            // @ts-ignore
            axios.defaults.headers.common.Authorization = token;
            commit('auth_success', { token, username: user.username });
            resolve(res);
          })
          .catch((err) => {
            commit('auth_error', err);
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            reject(err);
          });
      });
    },
    register({ commit }, userRegister) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        const { username, email, password } = userRegister;
        axios
          // @ts-ignore
          .post('http://localhost:4000/register', { username, email, password })
          .then((res) => {
            const { token } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            // @ts-ignore
            axios.defaults.headers.common.Authorization = token;
            commit('auth_success', token, username);
            resolve(res);
          })
          .catch((err) => {
            commit('auth_error');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          commit('logout');
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          // @ts-ignore
          delete axios.defaults.headers.common.Authorization;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    username: state => state.username,
  },
});
