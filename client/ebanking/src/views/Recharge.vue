<template>
<div>
  <main role="main" class="container">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
    <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Nạp tiền</h6>
      </div>
    </div>
    <div class="my-3 p-3 bg-white rounded shadow-sm">
        <form>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="cardId">Số tài khoản</label>
                    <input type="text" class="form-control" id="cardId" maxlength="30" placeholder="Số tài khoản"
                        v-model="cardId" required="required" v-on:change="change"/>
                </div>
                <div class="form-group col-md-6">
                    <label for="name">Tên người dùng</label>
                    <input v-model="name" type="text" class="form-control" id="name" readonly>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="money">Số tiền</label>
                    <input v-model="money" type="text" class="form-control" id="money" placeholder="Số tiền">
                </div>
                <div class="form-group col-md-6">
                    <label for="curMoney">Số dư khả dụng (VND)</label>
                    <input v-model="curMoney" type="number" class="form-control" id="curMoney" readonly value="0">
                </div>
            </div>
            <button v-on:click="recharge" type="button" class="btn btn-outline-success btn-lg">Nạp tiền</button>
        </form>
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
      loading: false, // used to init loading state (css, image) for entire page (full screen)
      
      cards: [], // list cards,
      cardId: '',
      name: '',
      money: 0,
      curMoney: 0,
    }
  },
   components: {
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
    // change money, name
    change() {
      if(this.cardId.length == 16) {
        api.getCardId(this.cardId).then(res => {
        this.name = res.data[0].Name;
        this.curMoney = res.data[0].Money;
      }).catch(err => {
        console.log(err);
      })
      } else {
        this.name = '';
        this.curMoney = 0;
      }
    },
    // recharge
    recharge() {
        var recMoney = +this.money + +this.curMoney;
        // call api
        api.getCardId(this.cardId).then(res => {
          if (res.data[0].IsClosed === 0) {
            api.updateCard(this.cardId, recMoney).then(res => {
            setTimeout(() => 500); // finish loading after 2s
            // show alert success
            this.$dialog.alert('Nạp tiền thành công!').then(function(dialog) { 
            console.log('success');
            });
            // clear
            this.setDefault();
            }).catch(err => {
                this.$dialog.alert('Nạp tiền không thành công, vui lòng thử lại sau!').then(function(dialog) { 
                    console.log('another');
                });
            })
          }
          else {
            this.$dialog.alert('Tài khoản đã đóng, vui lòng thử lại sau!').then(function(dialog) { 
                console.log('another');
            });
          }
        })
    },

    setDefault() {
        this.cardId = '';
        this.name = '';
        this.money = 0;
        this.curMoney = 0;
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

