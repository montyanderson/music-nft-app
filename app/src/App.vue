<template>
	<div id="app">
		<div class="connectBtn">
			<h2 class="connectText">Connect to a wallet</h2>
		</div>
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
	background: linear-gradient(180deg, #2f2d2d 0%, #121212 100%);

	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

.connectBtn {
	position: fixed;
	width: 200px;
	height: 65px;
	right: 10px;
	top: 10px;
	z-index: +1;
	cursor: pointer;
	background: #608dff;
	border: none;
	color: white;
	border-radius: 120px;
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 10px #3f74fb;
}
.connectText {
	position: absolute;
	font-size: 16px;
	font-weight: 600;
	font-style: normal;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	white-space: nowrap;
}
</style>

<script>
export default {
	created() {
		this.$store.dispatch("getReleases");
	}
};
</script>
