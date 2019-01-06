<template>
<div>
  <main role="main" class="container">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
    <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Quản lý danh bạ</h6>
      </div>
    </div>
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <h6 class="mb-0">Danh bạ</h6>
      <button type="button" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addContactModal">
      Thêm người nhận
      </button>
      <template v-if="contacts.length">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Họ tên</th>
                <th scope="col">Tài khoản</th>
              </tr>
            </thead>
            <tbody>
              <tr :class="{ 'table-info' : index % 2 == 0, 'table-light': index % 2 == 1}" v-for="(contact, index) in contacts" :key="contact.Id">
                <td>{{contact.Name}}</td>
                <td>
                  {{contact.CardId}} 
                  <span><font-awesome-icon class="closeCard" :icon="['fa', 'backspace']" v-on:click="deleteContact(contact)"/></span>
                  &nbsp;
                  <span><font-awesome-icon class="closeCard" :icon="['fa', 'pencil-alt']" v-on:click="initEditContactModal(contact)" data-toggle="modal" data-target="#editContactModal"/></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
      <template v-else>
        <h6 style="margin: auto;" class="text-center">Bạn chưa có liên hệ nào!</h6>            
      </template>
    </div>
    <!-- Add New Contact Modal -->
    <div class="modal fade" id="addContactModal" tabindex="-1" role="dialog" aria-labelledby="addContactModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addContactModalLabel">Thêm người nhận</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form v-on:submit.prevent="addContact()" id="addContactForm" autocomplete="off">
            <vue-element-loading :active="loadingForm" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
            <div class="modal-body">
              <div class="form-group">
                <label for="username">Số tài khoản *</label>
                <input type="text" class="form-control" id="username" maxlength="16" placeholder="Tài khoản"
                  v-model="newContact.CardId" required="required" />
              </div>
              <div class="form-group">
                <label for="name">Tên gợi nhớ</label>
                <input type="text" id="name" class="form-control" maxlength="50" v-model="newContact.Name" placeholder="Họ và tên"/>
              </div>
              <p class="font-italic text-warning">* - Yêu cầu bắt buộc nhập</p>
            </div>
            <div class="modal-footer">
              <button type="button" style="padding: .375rem .75rem;" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Hủy</button>
              <button type="submit" style="padding: .375rem .75rem;" id="addUserBtn" class="btn btn-outline-success btn-sm">Thêm</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Edit Contact Modal -->
    <div class="modal fade" id="editContactModal" tabindex="-1" role="dialog" aria-labelledby="editContactModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editContactModalLabel">Cập nhật người nhận</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form v-on:submit.prevent="editContact()" id="editContactForm" autocomplete="off">
            <vue-element-loading :active="loadingForm" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
            <div class="modal-body">
              <div class="form-group">
                <label for="username">Số tài khoản *</label>
                <input type="text" class="form-control" id="username" maxlength="16" placeholder="Tài khoản"
                  v-model="curContact.CardId" required="required" />
              </div>
              <div class="form-group">
                <label for="name">Tên gợi nhớ</label>
                <input type="text" id="name" class="form-control" maxlength="50" v-model="curContact.Name" placeholder="Họ và tên"/>
              </div>
              <p class="font-italic text-warning">* - Yêu cầu bắt buộc nhập</p>
            </div>
            <div class="modal-footer">
              <button type="button" style="padding: .375rem .75rem;" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Hủy</button>
              <button type="submit" style="padding: .375rem .75rem;" id="addUserBtn" class="btn btn-outline-success btn-sm">Cập nhật</button>
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
import VueElementLoading from 'vue-element-loading';
require('@/assets/js/index.js');
export default {
  name: 'Contact',
  created() {
    // get all contact before create
    this.fetchContact();
  },
  data () {
    return {
      loading: false, // used to init loading state (css, image) for entire page (full screen)
      loadingForm: false, // used to init loading state (css, image) for modal add user
      errAddUser: false,
      contacts: [], // list contacts,
      // new user
      newContact: {
        CardId: '',
        Name: '',
      },
      curContact: {
        Id: '',
        CardId: '',
        Name: '',
      }    
    }
  },
  components: {
    VueElementLoading  // loading page
  },
  methods: {
    // get all card
    fetchContact() {
      this.loading = true; // loading entire page
      this.contacts = [];
      // call api
      api.allContact().then(res => {
        this.contacts = res.data;
        setTimeout(() => this.loading = false, 500); // finish loading after 1s
      }).catch(err => {
        setTimeout(() => this.loading = false, 500); // finish loading after 1s
        console.log(err);
      })
    },
    // close card by id
    addContact() {
      this.loadingForm = true; // loading modal
      // call api
      api.addContact(this.newContact).then(res => {
          setTimeout(() => this.loadingForm = false, 500); // finish loading after 2s
        // show alert success
        this.$dialog.alert('Thêm người nhận thành công!').then(function(dialog) { 
            console.log('success');
        });
        // clear form
        this.setDefaultContact();
        // hide modal
        $('#addContactModal').modal('hide');
        this.fetchContact();
      }).catch(err => {
        var msg = '';
        var status = err.response.status;
        if (err.response.status == 422) {
            msg = 'Liên hệ với số tài khoản này đã tồn tại!';
        } else if (err.response.status == 404) {
            msg = 'Số tài khoản không hợp lệ!';
        } else {
            msg = 'Thêm liên hệ không thành công, vui lòng thử lại sau!';            
        }
        this.$dialog.alert(msg).then(function(dialog) { 
            console.log(status);
        });
        this.loadingForm = false;
      })
    },
    setDefaultContact() {
        this.newContact.CardId = '';
        this.newContact.Name = '';
    },
    initEditContactModal(contact) {
      this.curContact.Id = contact.Id;
      this.curContact.Name = contact.Name;
      this.curContact.CardId = contact.CardId;
      this.curContact.UserId = contact.UserId;
    },
    editContact() {
      this.loadingForm = true; // loading modal
      // call api
      api.editContact(this.curContact).then(res => {
          setTimeout(() => this.loadingForm = false, 500); // finish loading after 2s
        // show alert success
        this.$dialog.alert('Cập nhật người nhận thành công!').then(function(dialog) { 
            console.log('success');
        });
        // clear form
        this.curContact.Id = '';
        this.curContact.Name = '';
        this.curContact.CardId = '';
        this.curContact.UserId = '';
        // hide modal
        $('#editContactModal').modal('hide');
        this.fetchContact();
      }).catch(err => {
        var msg = '';
        var status = err.response.status;
        if (err.response.status == 404) {
            msg = 'Số tài khoản không hợp lệ!';
        } else {
            msg = 'Cập nhật liên hệ không thành công, vui lòng thử lại sau!';            
        }
        this.$dialog.alert(msg).then(function(dialog) { 
            console.log(status);
        });
        this.loadingForm = false;
      })
    },
    deleteContact(contact) {
      let message = {
        title: 'Bạn có muốn xóa liên hệ này không?',
        body: `Tên: ${contact.Name}. Số tài khoản: ${contact.CardId}`
      }
      var that = this;
      var clone = this.$dialog;
      this.$dialog.confirm(message, {loader: true}).then(function(dialog) { 
        api.deleteContact(contact).then(res => {
          dialog.loading(false);
          // finish loading after 2s
          clone.alert('Xóa liên hệ thành công').then(function(d) { 
            console.log('Success');
          });
          dialog.close();
            that.fetchContact();
          }).catch(err => {
            console.log(err);
            var msg = 'Xóa liên hệ không thành công, vui lòng thử lại sau!';
            var status = err.response.status;
            clone.alert(msg).then(function(d) { 
              console.log(status);
            });
            dialog.loading(false);
          })
      }).catch(function() {
        console.log('Clicked on cancel');
      });
    }
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

