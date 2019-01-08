<template>
  <div>
    <main role="main" class="container">
      <div class="d-flex justify-content-center align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm" style="background-color:#6f42c1;">
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">Danh sách thông báo</h6>
        </div>
      </div>
      <div class="my-3 p-3 bg-white rounded shadow-sm">
        <h6 class="mb-0">Danh sách thông báo</h6>
        <template v-if="notifies.length">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Tiêu đề</th>
                  <th scope="col">Nội dung</th>
                </tr>
              </thead>
              <tbody>
                <tr :class="{ 'table-info' : index % 2 == 0, 'table-light': index % 2 == 1}" v-for="(notify, index) in notifies" :key="notify.id">
                  <td>{{notify.title}}</td>
                  <td>{{notify.content}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else>
          <h6 style="margin: auto;" class="text-center">Hiện tại chưa có bất kì thông báo nào!</h6>            
        </template>
      </div>
    </main>
  </div>
</template>

<script>
var api = require("../utils/api.js");
import VueElementLoading from "vue-element-loading";
export default {
  name: "Notifies",
  created() {
    this.fetchNotify();
  },
  data() {
    return {
      notifies: [],
    };
  },
  methods: {
    fetchNotify() {
      this.notifies = [];
      api
        .getNotifies()
        .then(res => {
          this.notifies = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    truncate: function (text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  }
};
</script>