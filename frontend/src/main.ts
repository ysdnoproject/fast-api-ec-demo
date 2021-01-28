import Vue from "vue";
import App from "@/App.vue";
import "@/plugins/element";
import store from "@/store";
import router from "@/router";
import i18n from "@/i18n";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
