<template>
<div>
  <main role="main" class="container">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
    <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Danh sách người dùng</h6>
      </div>
    </div>

    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <h6 class="mb-0">Người dùng</h6>
      <button type="button" style="padding: .375rem .75rem;" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addUserModal">
        Thêm người dùng
      </button>
      <template v-if="users.length">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Tài khoản</th>
                <th scope="col">Họ tên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              <tr :class="{ 'table-info' : index % 2 == 0, 'table-light': index % 2 == 1}" v-for="(user, index) in users" :key="user.Id">
                <td>{{user.Username}}</td>
                <td>{{user.Name}}</td>
                <td>{{user.Email}}</td> 
                <td>{{user.Phone}}</td> 
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-else>
        <h6 style="margin: auto;" class="text-center">Hiện tại chưa có bất kì người dùng nào!</h6>            
      </template>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Thêm người dùng</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <form v-on:submit.prevent="addUser()" id="addUserForm" autocomplete="off">
                  <vue-element-loading :active="loadingForm" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
                  <div class="modal-body">
                      <div class="form-group">
                          <label for="username">Tài khoản</label>
                          <input type="text" class="form-control" id="username" maxlength="30" placeholder="Tài khoản"
                              v-model="newUser.Username" required="required" />
                      </div>
                      <div class="form-group">
                          <label for="name">Họ tên</label>
                          <input type="text" id="name" class="form-control" v-model="newUser.Name" placeholder="Họ và tên" required="required"/>
                      </div>
                      <div class="form-group">
                          <label for="dob">Ngày sinh</label>
                          <date-picker id="datePicker" v-model="newUser.DOB" :config="options"></date-picker>
                      </div>
                      <div class="form-group">
                          <label for="emai">Email</label>
                          <input type="email" class="form-control" id="email" maxlength="100"
                              placeholder="Email" v-model="newUser.Email" required="required"/>
                      </div>
                      <div class="form-group">
                          <label for="phone">Số điện thoại </label>
                          <input type="text" class="form-control" id="phone" maxlength="10" placeholder="Số điện thoại"
                          v-model="newUser.Phone" required="required" />
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" style="padding: .375rem .75rem;" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Hủy</button>
                      <button type="submit" style="padding: .375rem .75rem;" id="addUserBtn" class="btn btn-outline-success btn-sm">Thêm</button>
                  </div>
              </form>
          </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
var api = require('../utils/api.js');
import datePicker from 'vue-bootstrap-datetimepicker'; // datepicker
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'; // Import date picker css
import VueElementLoading from 'vue-element-loading'
import moment from 'moment';
require('@/assets/js/index.js');
export default {
  name: 'User',
  created() {
    // get all card before create
    this.fetchUser();
  },
  data () {
    return {
      loading: false, // used to init loading state (css, image) for entire page (full screen)
      loadingForm: false, // used to init loading state (css, image) for modal add user
      errAddUser: false,
      users: [], // list users,
      // new user
      newUser: {
            Username: '',
            DOB: moment(new Date()).format('YYYY-MM-DD'),
            Name: '',
            Email: '',
            Phone: '',
            Permission: 0
        },
        options: {
            format: 'YYYY-MM-DD',
            useCurrent: false,
        }      
    }
  },
  components: {
    datePicker, // date picker input
    VueElementLoading  // loading page
  },
  methods: {
    // get all card
    fetchUser() {
      this.loading = true; // loading entire page
      this.users = [];
      // call api
      api.allUser().then(res => {
        this.users = res.data;
        setTimeout(() => this.loading = false, 1000); // finish loading after 1s
      }).catch(err => {
        setTimeout(() => this.loading = false, 1000); // finish loading after 1s
        console.log(err);
      })
    },
    // close card by id
    addUser() {
      this.loadingForm = true; // loading modal
      // call api
      api.addUser(this. newUser).then(res => {
        setTimeout(() => this.loadingForm = false, 500); // finish loading after 2s
        // show alert success
        this.$dialog.alert('Thêm người dùng thành công!').then(function(dialog) { 
          console.log('success');
        });
        // clear form
        this.setDefaultNewUser();
        // hide modal
        $('#addUserModal').modal('hide');
        this.fetchUser();
      }).catch(err => {
        if (err.response.status == 422) {
            this.$dialog.alert('Tài khoản đã tồn tại!').then(function(dialog) { 
                console.log('422');
            });
        } else {
            this.$dialog.alert('Thêm người dùng không thành công, vui lòng thử lại sau!').then(function(dialog) { 
                console.log('another');
            });
        }
        this.loadingForm = false;
      })
    },
    setDefaultNewUser() {
        this.newUser.Username = '';
        this.newUser.Name = '';
        this.newUser.Email = '';
        this.newUser.Phone = '';
        this.newUser.DOB = moment(new Date()).format('YYYY-MM-DD');
        this.newUser.Permission = 0;
    },
  }
}
</script>

<style>
a {
  cursor: pointer;
}

a:hover {
  color: #5672f9;
}

.closeCard {
  cursor: pointer;
}
</style>

