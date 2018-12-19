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
                  <input type="text" class="form-control" v-model="Username" id="username" autofocus>
              </div>
              <!-- Password -->
              <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" class="form-control" v-model="Password" id="password">
              </div>
              <!-- Checkbox -->
              <div class="form-check">
                <label class="form-check-label" for="rememberme">
                  <input class="form-check-input" type="checkbox" value="" id="rememberme">
                  Remember me
                </label>
              </div>
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
  name: "Login",
  data() {
    return {
      Username: "",
      Password: "",
      Error: false
    };
  },
  methods: {
    handleSubmit(e) {
      this.Error = false;
      e.preventDefault();
      if (this.Password.length > 0) {
        let Username = this.Username;
        let Password = this.Password;
        this.$store
          .dispatch("login", { Username, Password })
          .then(res => {})
          .catch(err => console.log(err));
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
