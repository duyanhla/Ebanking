<template>
  <div>
    <main role="main" class="container">
      <div
        class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm"
        style="background-color:#6f42c1;"
      >
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">Lịch sử giao dịch</h6>
        </div>
      </div>
      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <div class="row">
          <div class="col-md-3 col-12">
            <div class="input-group mb-3">
              <select
                class="custom-select"
                id="chooseCard"
                v-on:change="cardChange"
                v-model="chooseCard"
              >
                <option :value="null">Tất cả...</option>
                <option v-for="card in cards" :key="card.Id" v-bind:value="card">{{card.Id}}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="media text-muted pt-3">
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block">Ngày</strong>
              </p>
            </div>
          </div>
          <div class="col">
            <div class="media text-muted pt-3">
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block">Số tiền chuyển (VND)</strong>
              </p>
            </div>
          </div>
          <div class="col">
            <div class="media text-muted pt-3">
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block">Tài khoản gửi</strong>
              </p>
            </div>
          </div>
          <div class="col">
            <div class="media text-muted pt-3">
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block">Tài khoản nhận</strong>
              </p>
            </div>
          </div>
        </div>
        <div v-for="transaction in transactions" :key="transaction.Id" class="row">
          <div class="col">
            <div class="media text-muted pt-3">
              <p
                class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
              >{{transaction.CreatedTime}}</p>
            </div>
          </div>
          <div class="col">
            <div class="media text-muted pt-3">
              <p
                class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
              >{{transaction.Money}}</p>
            </div>
          </div>
          <div class="col">
            <div class="media text-muted pt-3">
              <p
                class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
              >{{transaction.SrcCardId}}</p>
            </div>
          </div>
          <div class="col">
            <div class="media text-muted pt-3">
              <p
                class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
              >{{transaction.DesCardId}}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
var api = require("../utils/api.js");
import VueElementLoading from "vue-element-loading";
import { getUserbyCard } from "../utils/api.js";
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
