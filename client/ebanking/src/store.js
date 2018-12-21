import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from './router';
import jwtDecode from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "", // status
    token: localStorage.getItem("token") || "" // token
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    // refresh token
    renew_token({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        let refreshToken = localStorage.getItem("renew-token") || "";
        axios({
          url: "http://localhost:3000/user/renew-token",
          data: { refreshToken: refreshToken },
          method: "POST"
        }).then(res => {
            const token = res.data.access_token;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["x-access-token"] = token;
            commit("auth_success", token, this.state.user);
            resolve(res);
          })
          .catch(err => {
            commit("auth_error");
            dispatch("logout");
          });
      });
    },
    // verify recaptcha
    recaptcha({commit}, g_recaptcha_response) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/user/captcha",
          data: g_recaptcha_response,
          method: "POST"
        })
          .then(res => {
            console.log(res);
            resolve(res);
          })
          .catch(err => {
            commit("auth_error");
            console.log(err);
            reject(err);
          });
      });
    },
    // login
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://localhost:3000/user/login",
          data: user,
          method: "POST"
        })
          .then(res => {
            const token = res.data.access_token;
            const renew_token = res.data.refresh_token;
            localStorage.setItem("token", token);
            localStorage.setItem("renew-token", renew_token);
            axios.defaults.headers.common["x-access-token"] = token;
            commit("auth_success", token);
            router.push({name: 'home'});
            resolve(res);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    // logout
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout");
        // axios({ url: "http://localhost:3000/user/logout", method: "POST" })
        //   .then(res => {
        //     localStorage.removeItem("token");
        //     delete axios.defaults.headers.common["x-access-token"];
        //     resolve(res);
        //   })
        //   .catch(err => {
        //     commit("auth_error");
        //     localStorage.removeItem("token");
        //     localStorage.removeItem("renew_token");
        //     reject(err);
        //   });
        localStorage.removeItem("token");
        localStorage.removeItem("renew-token");
        delete axios.defaults.headers.common["x-access-token"];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    currentUser: state => {
      // get user by decoding token
      const decodedToken = state.token && jwtDecode(state.token);
      if (decodedToken) {
        const currentTime = new Date().getTime() / 1000;
        // check token expire
        if (currentTime < decodedToken.exp) {
          return decodedToken;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
});
