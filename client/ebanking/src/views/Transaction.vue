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
      <label for="curMoney"  >Số dư khả dụng (VND)</label>
      <input v-model="curMoney" type="number" class="form-control" id="curMoney" readonly value="0">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="desCardId">Số tài khoản nhận</label>
      <input v-model="desCardId" type="text" class="form-control" id="desCardId" v-on:change="desChange" maxlength="16">
    </div>
    <div class="form-group col-md-6">
      <label for="inputCity">Tên người nhận</label>
      <input type="text" class="form-control" id="inputCity" readonly v-model="receiverName">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="transMoney">Số tiền chuyển</label>
      <input type="text" class="form-control" id="transMoney" v-model="transMoney">
    </div>
    <div class="form-group col-md-6">
      <label for="messages">Nội dung</label>
      <input type="text" class="form-control" id="messages" v-model="messages">
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputZip">Thanh toán phí</label>
      <div class="row">
      <div class="form-check col offset-1">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="true" v-model="fee" checked>
        <label class="form-check-label" for="exampleRadios1">
            Người nhận
        </label>
      </div>
      <div class="form-check col">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="false" v-model="fee" >
        <label class="form-check-label" for="exampleRadios2">
            Người gửi
        </label>
      </div>
      </div>
    </div>
  </div>
  <button type="button" class="btn btn-outline-success btn-lg" v-on:click="otpgen">Chuyển tiền</button>
</form>
    </div>
    <div class="modal fade" id="otpModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nhập OTP</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form v-on:submit.prevent="confirmOTP()" id="confirmotp" autocomplete="off">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="otpcode">Mã OTP</label>
                            <input type="text" class="form-control" id="otpcode" maxlength="6"
                                v-model="otp" required="required" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" style="padding: .375rem .75rem;" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">Hủy</button>
                        <button type="submit" style="padding: .375rem .75rem;" id="addUserBtn" class="btn btn-outline-success btn-sm">Xác nhận</button>
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
  name: 'Transaction',
  created() {
    this.fetchCard();
  },
  data () {
    return {
      cards: [],
      sourceCard: null,
      desCardId: '',
      curMoney: 0,
      receiverName: '',
      fee: true,
      transMoney: 0,
      loadingForm: false,
      messages: '',
      otp: ''
    }
  },
   components: {
    VueElementLoading  // loading page
  },
  methods: {
    fetchCard() {
      this.cards = [];
      api.getCard().then(res => {
        this.cards = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    sourceChange() {
      this.curMoney=this.sourceCard.Money;
    },
    desChange() {
      if(this.desCardId.length == 16)
      {
        this.loadingForm=true;
        api.getUserbyCard(this.desCardId).then(res => {
        this.receiverName = res.data[0].Name;
        this.loadingForm=false;
      }).catch(err => {
        console.log(err);
      })
      } else {
        this.receiverName='';
      }
    },
    confirmOTP() {
      console.log(this.otp)
    },
    otpgen() {
      var trans = {
        'SrcCardId': this.sourceCard.Id,
        'DesCardId': this.desCardId,
        'Money': +this.transMoney,
        'Message': this.messages
      }
      api.genOTP(trans).then(res => {
        $('#otpModal').modal('show');
      }).catch(err => {
        console.log(err);
      })
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

</style>

