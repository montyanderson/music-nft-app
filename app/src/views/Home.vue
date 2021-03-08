<style scoped>
h1 {
  font-family: Inter;
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 50px;
}

.release {
  grid-row: 1 / 3;
  cursor: pointer;
}

.release img {
  width: 250px;
}

.header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
}

.connectBtn{
  position: absolute;
  background: white;
  width: 180px;
  height: 60px;
  right: 10px;
  top: 10px;
}
.connectText{
  position: absolute;
  color: black;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  top: 50%;
left: 50%;
transform: translate(-50%, -50%);
white-space: nowrap;
}

.name {
  font-size: 1.5rem;
  text-align: left;
  margin-top: 1rem;
}

@media only screen and (max-width: 1150px){
   .releases {
  grid-template-columns: 1fr 1fr 1fr;

}
}
@media only screen and (max-width: 900px){
   .releases {
     display: flex;
     flex-direction: row;

}
}

</style>

<template>
  <div class="home">
    <h1>Releases</h1>
    <div class="header">
<div class="connectBtn">
  <h2 class="connectText">Connect to a wallet</h2>
</div>
</div>
    <div class="releases">
      <div class="release" v-for="release in releases" v-on:click="goToRelease(release)">
        <img v-bind:src="release.imageUrl">
        <p class="name">{{release.name}}</p>
        <p class="artist">{{release.artist}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    releases() {
      return this.$store.state.releases;
    },
    releasesLoading() {
      return this.$store.state.releasesLoading;
    }
  },
  methods: {
      goToRelease({id}) {
          this.$router.push({
              path: `/release/${id}`
          })
      }
  }
}
</script>