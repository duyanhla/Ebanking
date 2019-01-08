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
                          <router-link to="/transaction" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'money-check-alt']" /></span> Chuyển tiền nội bộ</router-link>
                          <router-link to="/contact" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'address-book']" /></span> Quản lý danh bạ</router-link>
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
                          <router-link to="/payment" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'credit-card']" /></span> Tài khoản thanh toán</router-link>
                          <router-link to="/recharge" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'dollar-sign']" /></span> Nạp tiền</router-link>
                        </div>
                      </li>
                      <li class="nav-item dropdown dropdown-slide">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <span><font-awesome-icon :icon="['fa', 'bell']" /></span> Thông báo <span><font-awesome-icon :icon="['fa', 'angle-down']" /></span>
                        </a>
                        <!-- Dropdown list -->
                        <div class="dropdown-menu dropdown-menu-right">
                          <router-link to="/notify" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'envelope']" /></span> Gửi thông báo</router-link>
                          <router-link to="/notifies" class="dropdown-item"><span><font-awesome-icon :icon="['fa', 'clipboard-list']" /></span> Danh sách thông báo</router-link>
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
                      <div :key="rerender" class="dropdown-menu dropdown-menu-right">
                        <a v-if="user.Permission == 0 && user.isSubcribe == 1" @click="unsubcribe" class="dropdown-item needPointer">
                          <span><font-awesome-icon :icon="['fa', 'check-square']" /></span> Nhận thông báo
                        </a>
                        <a v-if="user.Permission == 0 && user.isSubcribe == 0" @click="subcribe" class="dropdown-item needPointer">
                          <span><font-awesome-icon :icon="['fa', 'square']" /></span> Không nhận thông báo
                        </a>
                        <a class="dropdown-item needPointer" @click="logout">
                          <span><font-awesome-icon :icon="['fa', 'sign-out-alt']" /></span> Đăng xuất
                        </a>
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


<script>
var api = require("../utils/api.js");
export default {
  name: 'Navbar',
  data () {
    return {
      rerender: 0,
    }
  },
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
    },
    // subcribe
    subcribe: function() {
      api.subcribe().then(res => {
        this.user.isSubcribe = 1;
        this.rerender++;
      }).catch(err => {
        console.log(err);
      })
    },
    // unsubcribe
    unsubcribe: function() {
      api.unsubcribe().then(res => {
        this.user.isSubcribe = 0;
        this.rerender++;
      }).catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

<style>
  .needPointer{
    cursor: pointer;
  }

  .outerDivFull { margin-left:0px; } 
  .switchToggle input[type=checkbox]{height: 0; width: 0; visibility: hidden; position: absolute; }
  .switchToggle label {cursor: pointer; text-indent: -9999px; width: 60px; max-width: 60px; height: 20px; background: #d1d1d1; display: block; border-radius: 100px; position: relative; }
  .switchToggle label:after {content: ''; position: absolute; left: 2px; width: 20px; height: 20px; background: #fff; border-radius: 90px; transition: 0.3s; }
  .switchToggle input:checked + label, .switchToggle input:checked + input + label  {background: #3e98d3; }
  .switchToggle input + label:before, .switchToggle input + input + label:before {content: 'Tắt'; position: absolute; left: 30px; width: 20px; height: 20px; border-radius: 90px; transition: 0.3s; text-indent: 0; color: #fff; }
  .switchToggle input:checked + label:before, .switchToggle input:checked + input + label:before {content: 'Bật'; position: absolute; left: 10px; width: 26px; height: 26px; border-radius: 90px; transition: 0.3s; text-indent: 0; color: #fff; }
  .switchToggle input:checked + label:after, .switchToggle input:checked + input + label:after {left: calc(100% - 2px); transform: translateX(-100%); }
  .switchToggle label:active:after {width: 10px; } 
</style>