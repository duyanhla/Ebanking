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
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  }
};
</script>
