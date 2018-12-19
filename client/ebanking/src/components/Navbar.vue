<template lang="html">
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-expand-lg navigation">
              <router-link to="/" class="navbar-brand">FastPay</router-link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto main-nav ">
                  <li class="nav-item">
                    <router-link to="/" class="nav-link">Trang chủ</router-link>
                  </li>
                  <li class="nav-item dropdown dropdown-slide">
                    <a class="nav-link" href="#introduce">Giới thiệu</a>
                    <!-- <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Giới thiệu
                    </a> -->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#contact">Liên hệ</a>
                  </li>
                </ul>
                <ul class="navbar-nav ml-auto mt-10">
                  <li class="nav-item">
                    <a v-if="isLoggedIn" class="nav-link login-button" @click="logout">Logout</a>
                    <router-link to="/login" v-else class="nav-link login-button">Login</router-link>
                  </li>
                </ul>
                <h1 v-if="isLoggedIn">{{user.Username}}</h1>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    user: function() {
      return this.$store.getters.currentUser.user;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
    check: function() {
      this.$store.dispatch("check");
    }
  }
};
</script>
