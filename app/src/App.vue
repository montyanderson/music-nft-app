<template>
	<div id="app">

		<nav>
			<div class="user-detail" v-if="$store.state.walletConnected">
				<div class="wallet">
				<div class="wallet-value">0.04 <span class="eth-eth">ETH</span></div>
				<div class="wallet-id">0x8b3b85bc94</div>
				</div>
				<div class="ball"></div>
			</div>

			<div class="connectBtn" v-else v-on:click="$store.dispatch('connectWallet')">
				<h2 class="connectText">Connect to a wallet</h2>
			</div>
		</nav>

		<main>
			<transition name="fade" mode="out-in">
			<router-view></router-view>
			</transition>
		</main>
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


nav {
	height: 250px;
}

main {
	position: absolute;
	top: 75px;
	width: 100%;
}

.connectBtn {
	position: fixed;
	width: 200px;
	height: 62px;
	right: 10px;
	top: 10px;
	z-index: +1;
	cursor: pointer;
	border: none;
	color: white;
	border-radius: 120px;
background: linear-gradient(262.53deg, #608DFF 3.6%, #3F74FB 100%);
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3), inset 0px 0px 30px #134AD3, inset 0px 0px 10px #3F74FB;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.user-detail {
	position: fixed;
	right: 10px;
	top: 10px;

	width: 239px;
	height: 73px;
	border-radius: 300px;
	background-color: #282626;
	margin-top: 17px;
	margin-left: auto;
	margin-bottom: auto;
	margin-right: 14px;	
	z-index: +500;
}


/* stuff inside sidebar */
.wallet-id {
	margin-left: 32px;
	margin-top: 3px;

}
.wallet-value {
	margin-top: 14px;
	margin-left: 59px;
	margin-bottom: 5px;
	font-weight: bold;
	font-size: 20px;
	line-height: 24px;
}
.eth-eth  {
	font-weight: 200;
}

.ball {
	position: absolute;
	top: 5px;
	right: 10px;

	width: 63px;
	height: 63px;
	background: linear-gradient(57.71deg, #89aaff 6.65%, #2864ff 86.64%);
	border-radius: 200px;

}

</style>

<script>
export default {
	created() {
		this.$store.dispatch("getReleases");
	}
};
</script>
