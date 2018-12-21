import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  faAngleUp,
  faAngleDown,
  faBars,
  faList,
  faHistory,
  faMoneyCheckAlt,
  faBackspace,
  faAddressBook,
  faUserCircle,
  faTimesCircle,
  faHome,
  faCreditCard,
  faDonate,
  faShare,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

library.add(faAngleUp, faTimesCircle, faBackspace, faPhone, faAngleDown, faShare, faBars, faList, faHistory, faMoneyCheckAlt, faDonate, faAddressBook, faUserCircle, faHome, faCreditCard);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

// token at local storage
const token = localStorage.getItem("token");
if (token) {
  // set token to x-access-token
  Vue.prototype.$http.defaults.headers.common["x-access-token"] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
