<template lang="html">
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-expand-lg navigation">
              <router-link to="/" class="navbar-brand">FastPay</router-link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <font-awesome-icon :icon="['fa', 'bars']" />
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto main-nav ">
                  <li class="nav-item">
                    <router-link to="/" class="nav-link"><span><font-awesome-icon :icon="['fa', 'home']" /></span> Trang chủ</router-link>
                  </li>
                  <template v-if="isLoggedIn">
                    <template v-if="user.Permission == 0">
                      <li class="nav-item dropdown dropdown-slide">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span><font-awesome-icon :icon="['fa', 'credit-card']" /></span> Tài khoản <span><font-awesome-icon :icon="['fa', 'angle-down']" /></span>
                        </a>
                        <!-- Dropdown list -->
                        <div class="dropdown-menu dropdown-menu-right">
                          <router-link to="/card" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'list']" /></span> Danh sách tài khoản</router-link>
                          <router-link to="/history" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'history']" /></span> Lịch sử giao dịch</router-link>
                        </div>
                      </li>
                      <li class="nav-item dropdown dropdown-slide">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span><font-awesome-icon :icon="['fa', 'donate']" /></span> Chuyển tiền <span><font-awesome-icon :icon="['fa', 'angle-down']" /></span>
                        </a>
                        <!-- Dropdown list -->
                        <div class="dropdown-menu dropdown-menu-right">
                          <a class="dropdown-item" href="#"><span><font-awesome-icon :icon="['fa', 'money-check-alt']" /></span> Chuyển tiền nội bộ</a>
                          <router-link to="/contact" class="dropdown-item" href="#"><span><font-awesome-icon :icon="['fa', 'address-book']" /></span> Quản lý danh bạ</router-link>
                        </div>
                      </li>
                    </template>
                    <template v-else>
                      <li class="nav-item dropdown dropdown-slide">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span><font-awesome-icon :icon="['fa', 'list']" /></span> Quản lý <span><font-awesome-icon :icon="['fa', 'angle-down']" /></span>
                        </a>
                        <!-- Dropdown list -->
                        <div class="dropdown-menu dropdown-menu-right">
                          <router-link to="/user" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'user-circle']" /></span> Người dùng</router-link>
                          <router-link to="/" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'credit-card']" /></span> Tài khoản thanh toán</router-link>
                        </div>
                      </li>
                    </template>
                  </template>
                  <template v-else>
                    <li class="nav-item">
                      <a class="nav-link" href="#introduce"><span><font-awesome-icon :icon="['fa', 'share']" /></span> Giới thiệu</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#contact"><span><font-awesome-icon :icon="['fa', 'phone']" /></span> Liên hệ</a>
                    </li>
                  </template>
                </ul>
                <ul class="navbar-nav ml-auto mt-10">
                  <template v-if="isLoggedIn">
                    <li class="nav-item dropdown dropdown-slide">
                      <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span><font-awesome-icon :icon="['fa', 'user-circle']" /></span> {{user.Name}}
                      </a>
                      <!-- Dropdown list -->
                      <div class="dropdown-menu dropdown-menu-right">
                         <a class="dropdown-item" id="needPointer" @click="logout">Đăng xuất</a>
                      </div>
                    </li>
                  </template>
                  <template v-else>
                    <li class="nav-item">
                      <router-link to="/login" id="needPointer" class="nav-link login-button">Đăng nhập</router-link>
                    </li>
                  </template>                 
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
</template>

<style>
  #needPointer{
    cursor: pointer;
  }
</style>

<script>
export default {
  name: 'Navbar',
  computed: {
    // get isLoggedIn from store.js (Vuex)
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    // get user from store.js (Vuex)
    user: function() {
      return this.$store.getters.currentUser.user;
    }
  },
  methods: {
    // logout
    logout: function() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    }
  }
};
</script>
