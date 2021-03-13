import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Release from "../views/Release.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/release/:id",
		name: "Release",
		component: Release
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
	linkExactActiveClass: "active"
});

export default router;
