<template>
<div>
  <main role="main" class="container">
    <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
      <div class="lh-100">
        <h6 class="mb-0 text-white lh-100">Thông báo</h6>
      </div>
    </div>
    <div class="my-3 p-3 bg-white rounded shadow-sm">
      <form v-on:submit.prevent="sendNoti()" autocomplete="off">
        <vue-element-loading :active="loadingForm" spinner="bar-fade-scale" color="#FF6700" :is-full-screen="true"/>
        <div class="form-row">
          <div class="form-group col-12">
            <label for="title">Tiêu đề</label>
            <input type="text" class="form-control" id="title" v-model="title" required />
          </div>
          <div class="form-group col-12">
            <label for="content">Nội dung</label>
            <textarea rows="3" class="form-control" id="content" v-model="content" required />
          </div>
        </div>
        <button type="submit" class="btn btn-outline-success btn-lg" :disabled="checkValidCond">Gửi thông báo</button>
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
  name: 'Notify',
  data () {
    return {
        loadingForm: false,
        title: '',
        content: ''
    }
  },
   components: {
    VueElementLoading  // loading page
  },
  methods: {
    sendNoti() {
        console.log('a')
      this.loadingForm = true;
      api.sendNoti(this.title, this.content).then(res => {
        this.loadingForm = false;
        this.$dialog.alert('Gửi thông báo thành công!').then(function(dialog) {
          console.log('success');
        });
        this.title = '';
        this.content = '';
      }).catch(err => {
        this.loadingForm = false;        
        this.$dialog.alert('Gửi thông báo không thành công!').then(function(dialog) {
          console.log(err);
        });
      });
    }
  },
  computed: {
    checkValidCond() {
      if (this.title == '' || this.content == '') {
        return true;
      }
      return false;
    }
  }
}
 
</script>
 
<style>
a, tr {
  cursor: pointer;
}
 
</style>