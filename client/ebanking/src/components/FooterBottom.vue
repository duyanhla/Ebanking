<template>
   <!-- Footer Bottom -->
  <footer class="footer-bottom">
    <!-- Container Start -->
    <div class="container">
      <div class="row">
        <div class="col-sm-6 col-12">
          <!-- Copyright -->
          <div class="copyright">
            <p>© Bản quyền thuộc về Ngân hàng TMCP Công thương Việt Nam</p>
          </div>
        </div>
        <div class="col-sm-6 col-12">
          <!-- Social Icons -->
          <ul class="social-media-icons text-right">
            <li><a class="fa fa-facebook" href=""></a></li>
            <li><a class="fa fa-twitter" href=""></a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Container End -->
    <!-- To Top -->
    <div class="top-to">
      <router-link to="/" id="top" style="height: 40px;"><font-awesome-icon :icon="['fa', 'angle-up']" /></router-link>
    </div>
  </footer>    
</template>

<script>
export default {
  name: 'FooterBottom'
};
</script>
