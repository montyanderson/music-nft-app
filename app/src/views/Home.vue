<style scoped>
.releaseText {
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
  display: flex;
   flex-direction: row;
   flex-grow: 2;

   flex-wrap:  wrap ;
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
  position:absolute;
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
 

}
}
@media only screen and (max-width: 620px){

  .releases{
    width: 95%;
    margin-left: 10px;
    grid-gap: 20px;
  }
 .release img {
  width: 45vw;
}
.releaseText{
  font-size: 60px;
  margin-left: 10px;
}
}

@media only screen and (max-width: 500px){

  .releases{
     flex-direction: column;
  flex-wrap:   nowrap;
  margin-left: 20px;
  margin-top: 100px;
  }
  .release img {
  width: 90px;
 margin-top: -70px;
}
  .releaseText{
  font-size: 50px;
  margin-top: 80px;
  margin-left: 20px;
}
.name {
  position: relative;
  top: -91px;
  left: 110px;
font-weight: 600;
  font-size: 1.4rem;
  text-align: left;
  margin-top: 1rem;
}
.artist{
  position: relative;
  top: -87px;
  left: 110px;
}
}

@media only screen and (max-width: 300px){
 .releaseText{
  font-size: 40px;
}
}





</style>

<template>
  <div class="home">
    <h1 class="releaseText">Releases</h1>
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