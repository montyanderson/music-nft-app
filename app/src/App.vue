<template>
	<div id="app">
		<nav>
			<p class="all-releases">
				<router-link to="/" exact>
					All Releases
				</router-link>
			</p>

			<p class="my-releases">
				<router-link to="/my" exact>
					My Releases
				</router-link>
			</p>

			<transition name="connect-anim" mode="in-out">
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
	background: linear-gradient(180deg, #2f2d2d 0%, #121212 100%);

	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
}

nav {
	height: 250px;
}

a {
	color: inherit !important;
	text-decoration: inherit !important;
}

.all-releases {
	position: fixed;
	right: 540px;
	top: 32px;
	z-index: +1;
	cursor: pointer;
	border: none;
	color: #929292;
}

.my-releases {
	position: fixed;
	right: 400px;
	top: 32px;
	z-index: +1;
	cursor: pointer;
	border: none;
	color: #929292;
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
	background-color: #282626;
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
</style>