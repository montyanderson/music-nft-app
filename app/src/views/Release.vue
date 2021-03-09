<template>
  <div v-if="!releasesLoading">
      <div class="outer-container">
          <img v-bind:src="release.imageUrl" alt="album art">
          <div class="album-info">
             <h1>{{ release.name }}</h1>
             <h2>By <a href="#">Morrrrg</a></h2>
            <h2>2021, {{numberTracks}} songs, 69 min </h2>
            <h3>04/15</h3>
            <div class="album-buttons">
                <button class="btn-a">Buy Now 0.01<span>ETH</span></button>
                <button class="btn-b">Play</button>
            </div>
          </div>
        
        </div>
        <div class="tracklist">
            <h4 class="track-num">#</h4>
            <h4 class="track-title">TITLE</h4>
            <h4 class="track-time">TIME</h4>
      </div>
      <div class="line"></div>
    <ol>
      <li v-for="(track, index) in release.tracks">{{index + 1}}{{ track.name }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  computed: {
    release() {
      if (this.releasesLoading === true) {
        return {};
      }

      return this.$store.state.releases.find(
        (release) => String(release.id) === this.$route.params.id
      );
    },
    releasesLoading() {
      return this.$store.state.releasesLoading;
    },
    numberTracks(index) {
        let counter = 0;
        for(let track in this.release.tracks) {
            counter++
        }
        return counter
    }
  },
};
</script>

<style scoped>
.outer-container {
     display: flex;
    flex-direction: row;

}
.outer-container img {

    width: 311px;
    height: auto;
    margin-top: 90px;
    margin-left: 72px;
}
.album-info {
    display: flex;
    flex-direction: column;
    margin-top: 125px;
    margin-left: 32px;
}
h1 {
    font-weight: bold;
    font-size: 70px;
}
h2 {
    color: #B7B7B7;
    margin-top: 9px;
    font-size: 18px;
}
h2,
h3{
    font-weight: 300;

}
a {
    text-decoration: none;
    color: #ffffff;
}
h3 {
    margin-top: 16px;
    font-size: 22px;
}
.album-buttons {
display: flex;
flex-direction: row;
margin-top: 17px;
}
.btn-a  {
    font-size: 22px;
    width: 230px;
    height: 70px;
    margin-right: 15px;
    cursor: pointer;
}
.btn-b {
    width: 187px;
    height: 70px;
    border: 2px solid #ffffff;
    background-color: transparent;
    color: #ffffff;
    font-size: 22px;
    cursor: pointer;
}
.btn-a span {
    font-size: 18px;
}
.tracklist {
    display: flex;
    flex-direction: row;
}
.tracklist h4 {
    margin-top: 55px;
    margin-bottom: 14px;
}
.track-num {
   margin-left: 90px;
   margin-right: 103px;
}
.track-title {
    margin-right: 900px;
}
.line {
    position: absolute;
    width: 1125px;
    height: 0px;
    left: 72px;
    top: 491px;
    border: 2px solid #6d6d6d;
}


</style>
