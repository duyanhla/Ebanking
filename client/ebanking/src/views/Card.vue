<template>
<div>
  <main role="main" class="container">
    <vue-element-loading :active="loading" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
    <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Danh sách tài khoản</h6>
      </div>
    </div>

    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <h6 class="mb-0">Tài khoản thanh toán</h6>
      <div class="row">
        <div class="col">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <strong class="d-block">Số tài khoản</strong>
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
      <!-- loop through cards -->
      <div v-for="card in cards" :key="card.Id" class="row">
        <div class="col">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              {{card.Id}}
            </p>
          </div>
        </div>
        <div class="col">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              {{card.Money}}
            </p>
          </div>
        </div>
        <div class="col">
          <div class="media text-muted pt-3">
            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
              <template v-if="card.IsClosed == 0">
                Hoạt động <span><font-awesome-icon class="closeCard" :icon="['fa', 'backspace']" v-on:click="closeCard(card)"/></span>
              </template>
              <template v-else>
                Đã đóng
              </template>
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
import VueElementLoading from 'vue-element-loading';

export default {
  name: 'Card',
  created() {
    // get all card before create
    this.fetchCard();
  },
  components: {
    VueElementLoading  // loading page
  },
  data () {
    return {
      loading: false, // used to init loading state (css, image) for entire page (full screen)
      cards: [] // list cards
    }
  },
  methods: {
    // get all card
    fetchCard() {
      this.loading = true; // loading entire page
      this.cards = [];
      // call api
      api.getCard().then(res => {
        this.cards = res.data;
        setTimeout(() => this.loading = false, 1000); // finish loading after 1s
      }).catch(err => {
        console.log(err);
        setTimeout(() => this.loading = false, 1000); // finish loading after 1s
      })
    },
    // close card by id
    closeCard(card) {
      // check money
      if (card.Money > 0) {
        this.$dialog.alert('Vui lòng chuyển toàn bộ số dư trước khi đóng tài khoản!').then(function(dialog) { 
        });
      } else {
        // call api
        // api.closeCard(card.Id).then(res => {
        //   console.log(res);
        //   // update 
        //   card.IsClosed = true;
        // }).catch(err => {
        //   console.log(err);
        // });
        let message = {
            title: 'Bạn có muốn đóng tài khoản này không?',
            body: `Số tài khoản: ${card.Id}`
        }
        var that = this;
        this.$dialog.confirm(message, {loader: true}).then(function(dialog) { 
            api.closeCard(card.Id).then(res => {
              that.fetchCard();
              dialog.loading(false);
              dialog.close();
            }).catch(err => {
                console.log(err);
            })
        }).catch(function() {
            console.log('Clicked on cancel');
        });
      }
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

