import Vue from "vue";
import store from "./store.js";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Card from "./views/Card.vue";
import History from "./views/History.vue";

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
      path: "/history",
      name: "history",
      component: History,
      meta: {
        requiresAuth: true,
        title: "Lịch sử giao dịch"
      }
    },
    {
      path: "/card",
      name: "card",
      component: Card,
      meta: {
        requiresAuth: true,
        title: "Danh sách tài khoản"
      }
    }
  ]
});

// action before access page
router.beforeEach((to, from, next) => {
  if (store.getters.isLoggedIn) {
    store.dispatch("renew_token");
    // if (store.getters.currentUser == null) {
    //   store.dispatch("renew_token");
    // }
    // prevent access login page again while authentication successful
    if (to.name == "login") {
      // no need to go to login page, if user is already logged in - redirect
      return router.push({ name: "home" });
    }
  }
  // page requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // check login
    if (store.getters.isLoggedIn) {
      // set title
      document.title = to.meta.title;
      // go to next
      next();
    } else {
      // require login again
      next("/login");
    }
  } else {
    // set title
    document.title = to.meta.title;
    //go to next
    next();
  }
});

export default router;
