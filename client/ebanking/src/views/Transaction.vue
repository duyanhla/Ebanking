<template>
<div>
  <main role="main" class="container">
    <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Chuyển tiền</h6>
      </div>
    </div>
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <form>
        <vue-element-loading :active="loadingForm" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="sourceCard">Tài khoản thanh toán</label>
              <select class="custom-select" id="sourceCard" v-model="sourceCard" v-on:change="sourceChange" >
                <option :value="null" disabled >Chọn tài khoản</option>
                <option v-for="card in cards" :key="card.Id" v-bind:value="card">{{card.Id}}</option>
              </select>
          </div>
          <div class="form-group col-md-6">
            <label for="curMoney">Số dư khả dụng (VND)</label>
            <input v-model="curMoney" type="number" class="form-control" id="curMoney" readonly value="0">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="desCardId">Số tài khoản nhận</label>
            <input v-model="desCardId" type="text" class="form-control" id="desCardId" v-on:change="desChange" maxlength="16">
            <a data-toggle="modal" data-target="#contactModal">Chọn từ danh bạ</a>
            <div class="modal fade" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="contactModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="contactModalLabel">Danh bạ</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <table class="table">
                          <!-- <thead class="thead-dark"><tr><th>Tên người dùng</th></tr></thead> -->
                          <tbody>
                              <tr @click="selectContact(contact)" v-for="contact in contacts" :key="contact.Name" v-bind:value="contact">
                                {{contact.Name}}
                              </tr>
                          </tbody>
                        </table>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="inputCity">Tên người nhận</label>
            <input type="text" class="form-control" id="inputCity" readonly v-model="receiverName">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="transMoney">Số tiền chuyển (VND)</label>
            <input type="number" max="10000000" class="form-control" id="transMoney" v-model="transMoney">
          </div>
          <div class="form-group col-md-6">
            <label for="messages">Nội dung</label>
            <input type="text" class="form-control" id="messages" v-model="messages">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputZip">Thanh toán phí <template v-if="this.fee > 0 && this.err == ''">- <span class="font-italic">{{this.fee}} VND</span></template></label>
            <div class="row">
            <div class="form-check col offset-1">
              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value=true v-model="feeReceiver" checked>
              <label class="form-check-label" for="exampleRadios1">Người nhận</label>
            </div>
            <div class="form-check col">
              <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value=false v-model="feeReceiver" >
              <label class="form-check-label" for="exampleRadios2">Người gửi</label>
            </div>
            </div>
          </div>
        </div>
        <p class="m-0 text-danger font-weight-bold font-italic" v-if="this.err.length != 0">{{ this.err }}</p>
        <button type="button" class="btn btn-outline-success btn-lg" :disabled="checkValidCond" data-toggle="modal" data-target="#confirmModal">Chuyển tiền</button>
      </form>
    </div>
    <!-- otp modal -->
    <div class="modal fade" id="otpModal" tabindex="-1" role="dialog" aria-labelledby="otpModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="otpModalLabel">Nhập OTP</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form v-on:submit.prevent="confirmOTP()" id="confirmotp" autocomplete="off">
            <div class="modal-body">
              <div class="form-group">
                <label for="otpcode">Mã OTP</label>
                <input type="text" class="form-control" id="otpcode" maxlength="6" v-model="otp" required="required" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-outline-success btn-sm">Xác nhận</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- confirm modal -->
    <div class="modal fade" id="confirmModal" tabindex="-1" role="dialog" aria-labelledby="confirmModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmModalLabel">Xác nhận giao dịch</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row pb-2">
                <div class="col">
                  <p class="m-0">Tài khoản chuyển:</p>
                  <p class="m-0 font-weight-bold" v-if="this.sourceCard">{{ this.sourceCard.Id }}</p>
                </div>
                <div class="col">
                  <p class="m-0">Tài khoản nhận:</p>
                  <p class="m-0 font-weight-bold" v-if="this.desCardId.length === 16">{{ this.desCardId }}</p>
                </div>
              </div>
              <div class="row pb-2">
                <div class="col">
                  <p class="m-0">Tên người nhận:</p>
                  <p class="m-0 font-weight-bold">{{ this.receiverName }}</p>
                </div>
                <div class="col">
                  <p class="m-0">Số tiền chuyển:</p>
                  <p class="m-0 font-weight-bold">{{ this.transMoney }} VND</p>
                </div>
              </div>
              <div class="row pb-2">
                <div class="col">
                  <p class="m-0">Phí giao dịch:</p>
                  <p class="m-0 font-weight-bold">{{ this.fee }} VND</p>
                </div>
                <div class="col">
                  <p class="m-0">Nội dung:</p>
                  <p class="m-0 font-weight-bold">{{ this.messages }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Quay lại</button>
            <button type="button" class="btn btn-primary" v-on:click="otpgen">Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>
 
<script>
var api = require('../utils/api.js');
var opt = require('../utils/opts.js');
import VueElementLoading from 'vue-element-loading';
require('@/assets/js/index.js');
export default {
  name: 'Transaction',
  created() {
    this.fetchCard();
    this.fetchContact();
  },
  data () {
    return {
      contacts:[],
      cards: [],
      sourceCard: null,
      desCardId: '',
      curMoney: 0,
      receiverName: '',
      feeReceiver: true,
      transMoney: 0,
      loadingForm: false,
      messages: '',
      otp: '',
      transId: 0,
      err: '',
    }
  },
   components: {
    VueElementLoading  // loading page
  },
  methods: {
    fetchCard() {
      this.cards = [];
      api.getOpenCard().then(res => {
        this.cards = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    fetchContact() {
      this.contacts = [];
      api.allContact().then(res => {
        this.contacts = res.data;
        console.log(res)
      }).catch(err => {
        console.log(err);
      })
    },
    selectContact(contact) {
      this.desCardId = contact.CardId;
      this.receiverName = contact.Name;
      $("#contactModal").modal('hide');
    },
    sourceChange() {
      this.curMoney = this.sourceCard.Money;
    },
    desChange() {
      if(this.desCardId.length == 16)
      {
        this.loadingForm = true;
        api.getUserbyCard(this.desCardId).then(res => {
          this.receiverName = res.data[0].Name;
          this.loadingForm = false;
        }).catch(err => {
          this.loadingForm = false;
          this.receiverName = '';
          console.log(err);
          this.$dialog.alert('Số tài khoản không hợp lệ hoặc không còn hoạt động!').then(function(dialog) { 
            console.log('success');
          }); 
          this.desCardId = '';
        })
      } else {
        this.receiverName = '';
      }
    },
    confirmOTP() {
      api.verifyOTP(this.otp, this.transId).then(res => {
        api.confirmTrans(this.transId, this.fee, this.feeReceiver).then(response => {
          this.desCardId = '';
          this.sourceCard = null;
          this.receiverName = '';
          this.err = '';
          this.messages = '';
          this.transMoney = 0;
          this.feeReceiver = true;
          this.curMoney = 0;
          $('#otpModal').modal('hide');
          this.otp = '';
          this.$dialog.alert('Chuyển khoản thành công!').then(function(dialog) {
            console.log('success');
          });
          this.fetchCard();
        })
      }).catch(err => {
        this.$dialog.alert('OTP không hợp lệ hoặc hết hạn!').then(function(dialog) {
          console.log(err);
        });
      });
    },
    otpgen() {
      var trans = {
        'SrcCardId': this.sourceCard.Id,
        'DesCardId': this.desCardId,
        'Money': +this.transMoney,
        'Message': this.messages
      }
      api.genOTP(trans).then(res => {
        this.transId = res.data.transId;
        $('#confirmModal').modal('hide');
        $('#otpModal').modal('show');
      }).catch(err => {
        console.log(err);
      })
    }
  },
  computed: {
    checkValidCond() {
      if (this.sourceCard == null) {
        this.err = 'Vui lòng chọn tài khoản giao dịch!';
        return true;
      } else if (this.sourceCard.Money == 0) {
        this.err = 'Không thể giao dịch với số dư là 0!';
        return true;
      }
      if (this.receiverName == '') {
        this.err = 'Vui lòng nhập đúng số tài khoản nhận!';
        return true;
      } else if (this.sourceCard != null && this.desCardId == this.sourceCard.Id) {
        this.err = 'Không thể giao dịch với chính bản thân!';
        return true;
      }
      if (this.transMoney < opt.TRANSFER.minTrans) {
        this.err = `Số tiền giao dịch tối thiểu là ${opt.TRANSFER.minTrans} VND`;
        return true;
      } else if (this.transMoney > opt.TRANSFER.maxTrans) {
        this.err = `Số tiền giao dịch tối đa là ${opt.TRANSFER.maxTrans} VND`;
        return true;
      } else if (this.transMoney % opt.TRANSFER.mul != 0) {
        this.err = `Số tiền giao dịch phải là bội số của ${opt.TRANSFER.mul}`;
        return true;
      }
      if (this.sourceCard.Money < +this.transMoney) {
        console.log('a')
        this.err = `Số dư không đủ để thực hiện giao dịch`;
        return true;
      }
      if (this.feeReceiver == 'false') {
        if (this.sourceCard.Money < +this.transMoney + this.fee) {
          this.err = `Số dư không đủ để thực hiện giao dịch`;
          return true;
        }
      }
      if (this.messages == '') {
        this.err = 'Vui lòng nhập nội dung giao dịch!';
        return true;
      }
      this.err = '';
      return false;
    },
    fee: function() {
      if (this.sourceCard == null || this.receiverName == '') {
        return 0;
      } else {
        var res = +this.transMoney*opt.TRANSFER.fee/100;
        if (res < opt.TRANSFER.minFee) {
          res = opt.TRANSFER.minFee;
        } else if (res > opt.TRANSFER.maxFee) {
          res = opt.TRANSFER.maxFee;
        }
        return res;
      }
    }
  }
}
 
</script>
 
<style>
a, tr {
  cursor: pointer;
}
 
</style>