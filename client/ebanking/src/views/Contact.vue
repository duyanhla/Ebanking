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
        <button type="button" style="padding: .375rem .75rem;" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addContactModal">
            Thêm người nhận
        </button>
      <div class="row">
        <template v-if="contacts.length">
            <div class="col">
                <div class="media text-muted pt-3">
                    <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong class="d-block">Họ tên</strong>
                    </p>
                </div>
            </div>
            <div class="col">
                <div class="media text-muted pt-3">
                    <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    <strong class="d-block">Tài khoản</strong>
                    </p>
                </div>
            </div>
        </template>
        <template v-else>
            <h6 style="margin: auto;" class="text-center">Bạn chưa có liên hệ nào</h6>            
        </template>
      </div>
      <!-- loop through cards -->
      <template v-if="contacts.length">
        <div v-for="contact in contacts" :key="contact.Id" class="row">
            <div class="col">
                <div class="media text-muted pt-3">
                <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                    {{contact.Name}}
                </p>
                </div>
            </div>
            <div class="col">
            <div class="media text-muted pt-3">
                <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                {{contact.CardId}} <span><font-awesome-icon class="closeCard" :icon="['fa', 'backspace']" v-on:click="deleteContact(contact)"/></span>
                </p>
            </div>
            </div>
        </div>
      </template>
    </div>
        <!-- Modal -->
    <div class="modal fade" id="addContactModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thêm người nhận</h5>
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

