<style scoped>
.header {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 80px;
}
</style>

<template>
	<div class="home">
		<h1 class="page-title">Releases</h1>
		<div class="header"></div>

		<release-list v-bind:releases="releases"></release-list>
	</div>
</template>

<script>
import ReleaseList from "../components/ReleaseList.vue";

export default {
	computed: {
		releases() {
			return this.$store.state.releases;
		}
	},
	components: {
		ReleaseList
	}
};
</script>
