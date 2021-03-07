<template>
    <div v-if="!releasesLoading">
        <h1>{{release.name}}</h1>

        <ol>
            <li v-for="track in release.tracks">{{track.name}}</li>
        </ol>
    </div>
</template>

<script>
export default {
    computed: {
        release() {
            if(this.releasesLoading === true) {
                return {};
            }

            return this.$store.state.releases.find(release => String(release.id) === this.$route.params.id);
        },
        releasesLoading() {
            return this.$store.state.releasesLoading;
        }
    }
}
</script>