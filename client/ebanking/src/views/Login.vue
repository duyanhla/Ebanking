<template>
<section class="hero-area bg-1 text-center overly">
    <!-- Container Start -->
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <!-- Edit Personal Info -->
          <div class="widget personal-info">
            <h3 class="widget-header user">Login</h3>
            <form action="#">
              <!-- Username -->
              <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" v-model="Username" id="username" autofocus required>
              </div>
              <!-- Password -->
              <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" v-model="Password" id="password" required>
              </div>
              <p class="text-danger text-left" v-if="Error">Tài khoản hoặc mật khẩu không đúng</p>
              <div class="g-recaptcha" :data-sitekey="rcapt_sig_key"></div>
              <p class="text-danger text-left" v-if="errCaptcha">Vui lòng xác nhận captcha</p>
              <!-- Submit button -->
              <button class="btn btn-transparent" @click="handleSubmit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Container End -->
  </section>
</template>

<script>
export default {
  name: 'Login',
  created() {
    // set script recaptcha tag
    let recaptcha = document.createElement('script');
    recaptcha.setAttribute('src', 'https://www.google.com/recaptcha/api.js');
    document.head.appendChild(recaptcha);
  },
  mounted() {
    // set secret key google recaptcha
    if (window.grecaptcha) {
      this.rcapt_id = grecaptcha.render( $('.g-recaptcha')[0], { sitekey : this.rcapt_sig_key });
    }
  },
  data() {
    // all data
    return {
      Username: '',
      Password: '',
      Error: false,
      errCaptcha: false,
      rcapt_id: 0,
      rcapt_sig_key: '6LcBUoEUAAAAANKGgP7sczNXsJJCcmQIzQUbUZ0y' // recaptcha secret key
    };
  },
  methods: {
    handleSubmit(e) {
      this.Error = false;
      this.errCaptcha = false;
      var g_recaptcha_response = grecaptcha.getResponse(this.rcapt_id);
      e.preventDefault();
      // verify captcha
      if (g_recaptcha_response.length == 0) {
        this.errCaptcha = true;
      } else {
        this.$store.dispatch('recaptcha', {g_recaptcha_response: g_recaptcha_response}).then(
          res => {
            if (this.Password.length > 0) {
              let Username = this.Username;
              let Password = this.Password;
              // login
              this.$store
                .dispatch('login', { Username, Password })
                .then(res => {})
                .catch(err =>  this.Error = true);
            }
          }
        ).catch(err => {
          console.log(err);
          this.$dialog.alert('Vui lòng xác nhận captcha!').then(function(dialog) { 
            console.log('error recaptcha');
          });
        })
      }
    }
  }
};
</script>

<style>
.hero-area {
  padding: 1.25rem 0 0 !important;
}
</style>
