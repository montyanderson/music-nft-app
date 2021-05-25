<template>
	<div id="app">
		<nav>
			<p class="lifted-dapp">
				<router-link to="/" exact> Lifted </router-link>
			</p>
			<p class="all-releases">
				<router-link to="/" exact> All Releases </router-link>
			</p>

			<p class="my-releases">
				<router-link to="/library" exact> My Library </router-link>
			</p>

			<transition name="connect-anim">
				<div
					class="user-detail"
					v-if="$store.state.walletConnected"
					key="connect-anim-1"
				>
					<div class="wallet">
						<div class="wallet-value">
							{{ ($store.state.balance / 10e17).toFixed(2) }}
							<span class="eth-eth">ETH</span>
						</div>
						<div class="wallet-id">
							{{ $store.state.address.slice(0, 12) }}
						</div>
					</div>
					<div class="ball"></div>
				</div>

				<div
					class="connectBtn"
					key="connect-anim-2"
					v-else
					v-on:click="$store.dispatch('connectWallet')"
				>
					<h2 class="connectText">Connect to a wallet</h2>
				</div>
			</transition>
		</nav>

		<main>
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</main>

		<player></player>
		<div class="rel-pad"></div>
	</div>
</template>

<script>
import Player from "./components/Player.vue";

export default {
	created() {
		this.$store.dispatch("getReleases");
		this.$store.dispatch("getPrice");
		this.$store.dispatch("player/init");
	},

	components: {
		Player
	}
};
</script>

<style>
.lifted-dapp {
	z-index: 50;
	margin-left: 4.9vw;
	position: absolute;
	font-weight: 700;
	font-size: 35px;
	background: linear-gradient(
		96.84deg,
		#dee7ff -3.53%,
		#eff4ff -3.53%,
		#baceff 105.96%,
		#d1deff 105.96%
	);
	letter-spacing: 0.03em;
	background-clip: text;
	-webkit-text-fill-color: transparent;
}
html {
	min-height: 100vh;
}

.rel-pad {
	padding-bottom: 700px;
}

* {
	margin: 0;
	padding: 0;
}

.connect-anim-enter-active,
.connect-anim-leave-active {
	transition: opacity 0.4s;
}
.connect-anim-enter, .connect-anim-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

#app {
	font-family: "Inter";
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: left;
	color: white;
	overflow-x: hidden;
	background: linear-gradient(179.13deg, #2e3c3f -16.12%, #051c22 52.38%);
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

* {
	-webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
nav {
	display: flex;
	align-items: center;
	height: 85px;
}

a {
	color: inherit !important;
	text-decoration: inherit !important;
}

.all-releases {
	position: fixed;
	right: 540px;
	cursor: pointer;
	border: none;
	color: #929292;
	z-index: +1;
}

.my-releases {
	position: fixed;
	right: 400px;
	cursor: pointer;
	border: none;
	color: #929292;
	z-index: +1;
}

main {
	position: absolute;
	top: 35px;
	width: 100%;
}

.connectBtn {
	position: fixed;
	width: 210px;
	height: 65px;
	right: 23px;

	top: 10px;
	z-index: +1;
	cursor: pointer;
	border: none;
	color: white;
	border-radius: 120px;
	background: linear-gradient(262.53deg, #608dff 3.6%, #3f74fb 100%);
	box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 30px #134ad3,
		inset 0px 0px 10px #3f74fb;
	border-radius: 120px;
	transition: all 0.1s;
}
.connectBtn:hover {
	transform: scale(1.05);
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

/* transition effects */

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

.user-detail {
	position: fixed;
	right: 23px;
	top: 10px;
	display: flex;
	align-items: center;
	width: 210px;
	height: 65px;
	border-radius: 300px;
	margin-left: auto;
	margin-bottom: auto;
	z-index: +500;
}

/* stuff inside sidebar */
.wallet-id {
	margin-left: 32px;
	margin-top: 2px;
	position: absolute;
	font-family: monospace;
}
.wallet-value {
	position: absolute;
	top: 10px;
	margin-left: 32px;
	margin-bottom: 5px;
	font-weight: bold;
	font-size: 20px;
	line-height: 24px;
	text-align: center;
}
.eth-eth {
	font-weight: 200;
}

.ball {
	position: absolute;
	right: 4.5px;

	width: 55px;
	height: 55px;
	background: linear-gradient(57.71deg, #89aaff 6.65%, #2864ff 86.64%);
	border-radius: 200px;
}
.active {
	color: #608dff !important;
}

.page-title {
	font-family: Inter;
	font-style: normal;
	font-weight: bold;
	font-size: 70px;
	line-height: 82px;
	/* identical to box height */

	color: #ffffff;
	margin-left: 19vw;

	margin-top: 100px;
}

@media only screen and (max-width: 779px) {
	.all-releases {
		right: 250px;
		top: 42px;
	}
	.my-releases {
		top: 20px;
		right: 260px;
	}
}

@media only screen and (max-width: 450px) {
	.all-releases,
	.my-releases,
	.connectBtn {
		display: none;
	}
}
</style>
