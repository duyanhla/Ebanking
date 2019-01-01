<template>
<div>
  <main role="main" class="container">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
    <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Danh sách tài khoản thanh toán</h6>
      </div>
    </div>

    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <h6 class="mb-0">Tài khoản thanh toán</h6>
        <button type="button" style="padding: .375rem .75rem;" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addCardModal">
            Tạo tài khoản thanh toán
        </button>
      <div class="row">
        <div class="col-6 col-md-3">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block">Số tài khoản</strong>
            </p>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block">Tài khoản</strong>
            </p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block">Họ tên</strong>
            </p>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block">Số dư (VND)</strong>
            </p>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block">Trạng thái</strong>
            </p>
          </div>
        </div>
      </div>
      <!-- loop through cards -->
      <div v-for="card in cards" :key="card.Id" class="row">
        <div class="col-6 col-md-3">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              {{card.Id}}
            </p>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              {{card.Username}}
            </p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              {{card.Name}}
            </p>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              {{card.Money}}
            </p>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <template v-if="card.IsClosed == 0">
                Hoạt động
              </template>
              <template v-else>
                Đã đóng
              </template>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-3 p-3 bg-white rounded shadow-sm">
        <!-- Modal -->
        <div class="modal fade" id="addCardModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Tạo tài khoản thanh toán</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form v-on:submit.prevent="addCard()" id="addCardForm" autocomplete="off">
                    <vue-element-loading :active="loadingForm" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="username">Tài khoản</label>
                            <input type="text" class="form-control" id="username" maxlength="30" placeholder="Tài khoản"
                                v-model="userName" required="required" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" style="padding: .375rem .75rem;" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Hủy</button>
                        <button type="submit" style="padding: .375rem .75rem;" id="addUserBtn" class="btn btn-outline-success btn-sm">Tạo</button>
                    </div>
                </form>
            </div>
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
  name: 'Card',
  created() {
    // get all card before create
    this.fetchCard();
  },
  data () {
    return {
      loading: false, // used to init loading state (css, image) for entire page (full screen)
      loadingForm: false, // used to init loading state (css, image) for modal add card
      
      cards: [], // list cards,
      userName: ''
    }
  },
  components: {
    datePicker, // date picker input
    VueElementLoading  // loading page
  },
  methods: {
    // get all card
    fetchCard() {
      this.loading = true; // loading entire page
      this.cards = [];
      // call api
      api.getAllCard().then(res => {
        this.cards = res.data;
        setTimeout(() => this.loading = false, 1000); // finish loading after 1s
      }).catch(err => {
        setTimeout(() => this.loading = false, 1000); // finish loading after 1s
        console.log(err);
      })
    },
    // add card
    addCard() {
      this.loadingForm = true; // loading modal
      // call api
      api.addCard(this.userName).then(res => {
        setTimeout(() => this.loadingForm = false, 500); // finish loading after 2s
        // show alert success
        this.$dialog.alert('Tạo tài khoản thanh toán thành công!').then(function(dialog) { 
          console.log('success');
        });
        // clear form
        this.setDefaultUsername();
        // hide modal
        $('#addCardModal').modal('hide');
        this.fetchCard();
      }).catch(err => {
        this.$dialog.alert('Tạo tài khoản thanh toán không thành công, vui lòng thử lại sau!').then(function(dialog) { 
            console.log('another');
        });
        this.loadingForm = false;
      })
    },
    setDefaultUsername() {
        this.userName = '';
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

