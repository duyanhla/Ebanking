import 'bootstrap'; // bootstrap-core
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap css
import { library } from '@fortawesome/fontawesome-svg-core';// fontawesome
// icon
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
  faPhone,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // fontawesome core
import Vue from 'vue';
import App from './App.vue'
import router from './router'; // Vue Router
import store from './store'; // Vuex
import axios from 'axios';
import VuejsDialog from 'vuejs-dialog'; // vue dialog (modal)
import 'vuejs-dialog/dist/vuejs-dialog.min.css'; // include the default style
import VueElementLoading from 'vue-element-loading' // loading

// using jquery as global
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

// Tell Vue to install the plugin.
Vue.use(VuejsDialog, {
  html: true,
  okText: 'Xác nhận',
  cancelText: 'Hủy',
  animation: 'bounce'
});

Vue.component('vue-element-loading', VueElementLoading);

// add icon fontawesome
library.add(faAngleUp, faTimesCircle, faBackspace, faPhone, faAngleDown, faShare, faBars, faList, faHistory, faMoneyCheckAlt, faDonate, faAddressBook, faUserCircle, faHome, faCreditCard, faDollarSign);
Vue.component('font-awesome-icon', FontAwesomeIcon); // set component fontawesome 

Vue.config.productionTip = false;
Vue.prototype.$http = axios; // default http using axios

// token at local storage
const token = localStorage.getItem('token');
if (token) {
  // set token to x-access-token
  Vue.prototype.$http.defaults.headers.common['x-access-token'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
