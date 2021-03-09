<template>
	<div id="app">
        <router-view></router-view>
	</div>
</template>

<style>
* {
	margin: 0;
	padding: 0;
}

#app {
	font-family: "Inter";
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: left;
	color: white;
overflow-x: hidden;
	background: linear-gradient(180deg, #2F2D2D 0%, #121212 100%);

	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}
</style>

<script>
export default {
	created() {
		this.$store.dispatch("getReleases");
	},
}
</script>