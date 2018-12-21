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

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
    FooterBottom
  },
  // created: function () {
    // this.$http.interceptors.request.use((config) => {
    //   let originalRequest = config;
    //   if (supports.checkExpireToken() === false && config.url.indexOf("captcha") == -1) {
    //     console.log('a')
    //     return store.dispatch("renew_token").then((token) => {
    //       console.log(token);
    //       return Promise.resolve(originalRequest);
    //     });
    //   }
    //   return config;
    // }, (err) => {
    //   console.log(err)
    //   return Promise.reject(err);
    // });
  // }
};
</script>
