import actions from "./actions.js";
import state from "./state.js";
import mutations from "./mutations.js";
import getters from "./getters";
import account_module from "./account/index.js";
import bet_module from "./bet/index.js";
import Vue from  "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
Vue.use(VueRouter);
Vue.use(Vuex);
var store = new Vuex.Store({
	state,
	actions,
	getters,
	mutations,
	modules:{
		account:account_module,
		bet:bet_module,
	}
});
export default store;
