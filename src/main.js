// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import VueClipboard from 'vue-clipboard2'
import Vuex from "vuex";
import axios from "axios";
import store from "./vuex/store.js";
//import Navigation from 'vue-navigation'
Vue.config.productionTip = false;
import VueKonva from 'vue-konva';
Vue.use(VueKonva);
Vue.use(VueClipboard)
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.use(Vuex);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
