<template>
    <div></div>
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