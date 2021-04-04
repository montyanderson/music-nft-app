import Vue from "vue";
import VueContentPlaceholders from 'vue-content-placeholders'

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueContentPlaceholders);

console.log(process.env);

new Vue({
	router,
	store,
	render: function(h) {
		return h(App);
	}
}).$mount("#app");
