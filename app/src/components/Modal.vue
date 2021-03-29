<template>
	<div class="modal-container" v-if="isOpen">
		<div class="modal-backdrop" v-on:click="close"></div>
		<div class="modal">
			<div class="modal-button" v-on:click="close">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M11.8137 13.5187L6.6999 18.544L5.0248 16.8394L10.1386 11.8141L5.11329 6.70038L6.81787 5.02528L11.8432 10.1391L16.9569 5.11377L18.632 6.81835L13.5183 11.8436L18.5435 16.9574L16.8389 18.6325L11.8137 13.5187Z"
						fill="#608DFF"
					/>
				</svg>
			</div>
			<slot></slot>

			<a href="#" v-on:click="close">close</a>
		</div>
	</div>
</template>

<script>
export default {
	props: ["id"],
	computed: {
		isOpen() {
			return this.$store.state.modal.active === this.id;
		}
	},
	methods: {
		close() {
			this.$store.state.modal.active = null;
		}
	},
	created() {
		const onEscape = e => {
			if (e.keyCode === 27) this.close();
		};
		document.addEventListener("keydown", onEscape);
		this.$once("hook:destroyed", () => {
			document.removeEventListener("keydown", onEscape);
		});
	}
};
</script>

<style scoped>
.modal-backdrop {
	position: absolute;
	background: rgba(87, 87, 87, 0.3);
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(1px);
	z-index: 0;
}
.modal-button:hover {
	transform: scale(1.3);
}
.modal-button {
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 34px;
	height: 34px;
	right: -8px;
	top: -8px;
	background: linear-gradient(
		152.97deg,
		rgba(5, 28, 35, 0.7) 0%,
		rgba(5, 28, 35, 0) 100%
	);
	border-radius: 30px;
	transition: all 0.2s;
}
.modal-container {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	display: flex;
	justify-content: center;
}

.modal {
	width: 500px;
	background: linear-gradient(
		152.97deg,
		rgba(5, 28, 35, 0.5) 0%,
		rgba(18, 38, 43, 0.5) 100%
	);
	backdrop-filter: blur(42px);
	/* Note: backdrop-filter has minimal browser support */

	border-radius: 16px;
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	align-items: center;

	margin-top: 150px;
	padding: 50px 0;
}

h1 {
	font-weight: 500;
	font-size: 48px;
	line-height: 58px;

	color: #ffffff;
}

p {
	margin-top: 30px;
	width: 350px;
}
</style>
