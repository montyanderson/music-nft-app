import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Release from "../views/Release.vue";
import my from "../views/my.vue";

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
	},
	{
		path: "/my",
		name: "my",
		component: my
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
	linkExactActiveClass: "active"
});

export default router;
