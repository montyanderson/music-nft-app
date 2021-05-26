import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Library from "../views/Library.vue";
import Release from "../views/Release.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Releases",
		component: Home
	},
	{
		path: "/library",
		name: "Library",
		component: Library
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
