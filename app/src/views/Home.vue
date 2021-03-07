<style scoped>
h1 {
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 70px;
line-height: 82px;
/* identical to box height */


color: #FFFFFF;
}

.releases {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.release {
  grid-row: 1 / 3;
}

.release img {
  width: 100%;
  padding-top: 100%;
}

p {
  font-size: 2rem;
}
</style>

<template>
  <div class="home">
    <h1>Releases</h1>

    <div class="releases" >
      <div class="release" v-for="release in releases">
        <img v-bind:src="release.imageUrl">
        <p>{{release.name}}</p>
      </div>
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