<template>
    <div class="player-container">
        <div class="playbtn"> <h3 class="play-fill"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
  <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
</svg></h3> </div>
        <div class="forward"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-skip-end-fill" viewBox="0 0 16 16">
  <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.693 3.3 4 3.678 4 4.308v7.384c0 .63.692 1.01 1.233.697L11.5 8.753V12a.5.5 0 0 0 1 0V4z"/>
</svg></div>
        <div class="back">
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-skip-start-fill" viewBox="0 0 16 16">
  <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.54-.313 1.232.066 1.232.696v7.384c0 .63-.692 1.01-1.232.697L5 8.753V12a.5.5 0 0 1-1 0V4z"/>
</svg>
        </div>

        <progress> </progress>

<div class="name">Alabama</div>
<div class="artist">Frank Ocean</div>
<div class="img"></div>
    </div>
</template>

<script>
export default {
    computed: {
        track() {
            return this.$store.getters["player/track"];    
        },
        isPlaying() {
            return this.$store.state.player.isPlaying;
        },
        duration() {
            return this.$store.state.player.duration;
        },
        currentTime() {
            return this.$store.state.player.currentTime;
        },
        progress() {
            return this.$store.getters["player/progress"];
        }
    }
}
</script>

<style scoped>
.player-container{
    position: fixed;
    height: 130px;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #171717;
}

.playbtn{
    position: absolute;
    width: 50px;
    height: 50px;
    background: white;
    top: 45px;
    border-radius: 50%;
    cursor: pointer;
    left: 50%;
    transform: translate(-50%, -50%);
}

.play-fill{
    position: absolute;
    color: black;
   
    top: 55%;
     left: 51%;
    transform: translate(-50%, -50%);
}

.forward{
    position: absolute;
    color: #878787;
    top: 45px;
     left: calc(50% + 70px);
    transform: translate(-50%, -50%);
}

.back{
 position: absolute;
    color: #878787;
    top: 45px;
     left: calc(50% - 70px);
    transform: translate(-50%, -50%);
}

progress{
    position: relative;
    top: 100px;
   left: 50%;
    transform: translate(-50%, -50%); 
}

.img{
    width: 90px;
    height: 90px;
    background: grey;
    position: absolute;
    top: 50%;
    margin-left: 60px;
    transform: translate(-50%, -50%);
}

.name{
font-size: 20px;
margin-left: 125px;
font-weight: 600;
margin-top: 20px;
}

.artist{
font-size: 13px;
margin-left: 125px;
margin-top: 6px;
}


</style>