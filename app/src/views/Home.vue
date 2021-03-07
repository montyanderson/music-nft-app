<template>
  <div class="home">
    <div v-for="release in releases">
      <img v-bind:src="release.imageUrl">
    </div>
  </div>
</template>

<script>
export default {
	created() {
		this.$store.dispatch("getReleases");
	},
  computed: {
    releases() {
      return this.$store.state.releases;
    }
  }
}
</script>