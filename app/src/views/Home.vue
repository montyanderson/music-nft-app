<style scoped>
.header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 80px;
}
footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 100px;
	background-color: #051c22;
	height: 200px;
	width: 100%;
}
.footer-cont {
	color: #878787;
	padding-top: 40px;
	font-size: 17px;
}
.footer-cont h2 {
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
	text-align: center;
	margin-bottom: 37px;
	font-size: 30px;
}
.logo,
a {
	width: 40px;
	transition: all 0.2s;
}
a:last-child {
	margin-left: 50px;
	margin-bottom: 15px;
}
.logo-cont {
	display: flex;
}
.logo:hover {
	opacity: 0.6;
}
.dee {
	align-self: flex-start;
	color: #696969;
	text-align: center;
	margin-left: 20px;
	padding-top: 7px;
}
.line {
	width: 100%;
	height: 15px;
	background-color: #69696996;
}


@media only screen and (max-width: 450px) {
	.page-title {
		font-size: 50px;
		margin-top: 50px;
	}
	.footer-cont {
		margin-top: 0px;
	}
	footer {
		margin-top: 0px;
	}
	.dee {
		padding-bottom: 130px;
	}
}
</style>

<template>
	<div class="home">
		<h1 class="page-title">Releases</h1>
		<div class="header"></div>

		<release-list v-bind:releases="releases"></release-list>
		<footer>
			<div class="footer-cont">
				<h2>Lifted</h2>
				<div class="logo-cont">
					<a href="#">
						<svg
							class="logo"
							enable-background="new 0 0 2447.6 2452.5"
							viewBox="0 0 2447.6 2452.5"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-rule="evenodd" fill-rule="evenodd">
								<path
									d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
									fill="#36c5f0"
								/>
								<path
									d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
									fill="#2eb67d"
								/>
								<path
									d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
									fill="#ecb22e"
								/>
								<path
									d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
									fill="#e01e5a"
								/>
							</g>
						</svg>
					</a>
					<a href="#">
						<svg
							class="logo"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								fill="#ffff"
							/>
						</svg>
					</a>
				</div>
			</div>
			<div class="line"></div>
			<p class="dee">Version: {{ hash }}</p>
		</footer>
	</div>
</template>

<script>
import ReleaseList from "../components/ReleaseList.vue";

export default {
	computed: {
		releases() {
			return this.$store.state.releases;
		},
		hash() {
			return process.env.VUE_APP_GITHUB_SHA;
		}
	},
	components: {
		ReleaseList
	}
};
</script>
