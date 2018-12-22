<template>
<div>
  <main role="main" class="container">
    <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Lịch sử giao dịch</h6>
      </div>
    </div>
    <div class="my-3 p-3 bg-white rounded shadow-sm">
    <h6 class="mb-0">Chọn tài khoản</h6>
    <div class="row">
      <div class="col-md-3 col-12">
        <div class="input-group mb-3">
          <select class="custom-select" id="inputGroupSelect01">
            <option selected>Choose...</option>
            <option v-for="card in cards" :key="card.Id" value="card.Id">{{card.Id}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row"></div>
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
              <strong class="d-block">Số dư (VND)</strong>
            </p>
          </div>
        </div>
        <div class="col">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block">Trạng thái</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
</template>

<script>
var api = require('../utils/api.js');

export default {
  name: 'History',
  created() {
    this.fetchCard();
  },
  mounted() {
    this.fetchCard();
  },
  data () {
    return {
      cards: [],
      history: [],
    }
  },
  methods: {
    fetchCard() {
      this.cards = [];
      api.getCard().then(res => {
        this.cards = res.data;
      }).catch(err => {
        console.log(err);
      })
    }
  }
}
</script>
