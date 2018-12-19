<template>
  <div>
    <Navbar />
    <Footer />
    <FooterBottom />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import FooterBottom from "@/components/FooterBottom.vue";

export default {
  name: "LayoutBasic",
  components: {
    Navbar,
    Footer,
    FooterBottom
  }
};
</script>
