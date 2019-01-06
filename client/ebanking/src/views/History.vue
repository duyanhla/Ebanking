<template>
  <div>
    <main role="main" class="container">
      <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">Lịch sử giao dịch</h6>
        </div>
      </div>
      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <h6 class="mb-0">Lịch sử giao dịch</h6>
        <div class="row">
          <div class="col-md-3 col-12">
            <div class="input-group mb-3">
              <select class="custom-select" id="chooseCard" v-on:change="cardChange" v-model="chooseCard">
                <option :value="null">Tất cả giao dịch</option>
                <option v-for="card in cards" :key="card.Id" v-bind:value="card">{{card.Id}}</option>
              </select>
            </div>
          </div>
        </div>
        <template v-if="transactions.length">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Ngày</th>
                  <th scope="col">Số tiền chuyển (VND)</th>
                  <th scope="col">Tài khoản gửi</th>
                  <th scope="col">Tài khoản nhận</th>
                </tr>
              </thead>
              <tbody>
                <tr :class="{ 'table-info' : index % 2 == 0, 'table-light': index % 2 == 1}" v-for="(transaction, index) in transactions" :key="transaction.Id">
                  <td>{{moment(transaction.CreatedTime).format('DD-MM-YYYY, HH:MM:SS')}}</td>
                  <td>{{transaction.Money}}</td>
                  <td>{{transaction.SrcCardId}}</td>
                  <td>{{transaction.DesCardId}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else>
          <h6 style="margin: auto;" class="text-center">Hiện tại chưa có bất kì lịch sử giao dịch nào!</h6>            
        </template>
      </div>
    </main>
  </div>
</template>

<script>
var api = require("../utils/api.js");
import VueElementLoading from "vue-element-loading";
require("@/assets/js/index.js");
export default {
  name: "History",
  created() {
    this.fetchCard();
    this.fetchTransaction();
  },
  mounted() {
    this.fetchCard();
  },
  data() {
    return {
      cards: [],
      transactions: [],
      chooseCard: ""
    };
  },
  methods: {
    fetchCard() {
      this.cards = [];
      api
        .getCard()
        .then(res => {
          this.cards = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchTransaction() {
      this.transactions = [];
      api
        .allTransactionsByUserId()
        .then(res => {
          this.transactions = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    cardChange() {
      if (this.chooseCard === null) {
        this.fetchTransaction();
      } else {
        api.getTransactionsByCardId(this.chooseCard.Id)
          .then(res => {
            this.transactions = res.data;
            // this.loadingForm = false;
          })
          .catch(err => {
            //  this.loadingForm = false;
            console.log(err);
          });
      }
    }
  }
};
</script>
