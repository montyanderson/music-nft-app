<style scoped>
h1 {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 70px;
  line-height: 82px;
  /* identical to box height */


  color: #FFFFFF;

  margin-left: 5%;
  margin-top: 100px;
}

.releases {
  margin-top: 5rem;

  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 50px;
}

.release {
  grid-row: 1 / 3;
}

.release img {
  width: 100%;
}

.name {
  font-size: 1.5rem;
  text-align: left;
  margin-top: 1rem;
}
</style>

<template>
  <div class="home">
    <h1>Releases</h1>

    <div class="releases" >
      <div class="release" v-for="release in releases">
        <img v-bind:src="release.imageUrl">
        <p class="name">{{release.name}}</p>
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