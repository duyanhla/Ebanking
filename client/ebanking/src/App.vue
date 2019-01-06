<template>
  <div id="app">
    <Navbar />
		<router-view />
		<Footer />
		<FooterBottom />
  </div>
</template>

<style src='./assets/css/style.css'>
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import FooterBottom from "@/components/FooterBottom.vue";
var supports = require('./utils/supports.js');

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    FooterBottom
  },
  // created: function () {
  //   this.$http.interceptors.request.use(config => {
  //     let originalRequest = config;
  //     console.log(supports.checkExpireToken())
  //     if (window.location.pathname.indexOf('/login') == -1) {
  //       console.log('a')
  //       return config;
  //     }
  //     else {
  //       if (supports.checkExpireToken() == false) {
  //         console.log('c')
  //         this.$router.push('login');
  //       }
  //     }
  //     return config;
  //   }, (err) => {
  //     console.log(err)
  //     return Promise.reject(err);
  //   });
  // }
};
</script>
