import Vue from "vue";
import store from "./store.js";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Trang chủ - Ebanking"
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Đăng nhập - Ebanking"
      }
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        requiresAuth: true,
        title: "About"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // if (store.getters.isLoggedIn) {
  //   store.dispatch("check")
  //   .then(res => console.log(res))
  //   .catch(err => console.log(err));
  // }
  if (store.getters.isLoggedIn && to.name == "login") {
    // no need to go to login page, if user is already logged in - redirect
    return router.push({ name: "home" });
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const loginpath = window.location.pathname;
    if (store.getters.isLoggedIn) {
      document.title = to.meta.title;
      next();
    } else {
      next("/login", { from: loginpath });
    }
  } else {
    document.title = to.meta.title;
    next();
  }
});

export default router;
