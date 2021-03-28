<template>
    <div class="modal-container" v-if="isOpen">
        <div class="modal">
            <slot></slot>

            <a href="#" v-on:click="close">close</a>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        "id"
    ],
    computed: {
        isOpen() {
            console.log('prop', this.id);
            return this.$store.state.modal.active === this.id;
        }
    },
    methods: {
        close() {
            this.$store.state.modal.active = null;
        }
    }
}
</script>

<style scoped>
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 1000;

    display: flex;
    justify-content: center;
}

.modal {
    width: 500px;

    background: linear-gradient(152.97deg, rgba(5, 28, 35, 0.5) 0%, rgba(18, 38, 43, 0.5) 100%);
    backdrop-filter: blur(42px);
    /* Note: backdrop-filter has minimal browser support */

    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    
    margin-top: 150px;
    padding: 50px 0;

    border: 1px solid rgba(255, 255, 255, 0.5);
}

h1 {
    font-weight: 500;
    font-size: 48px;
    line-height: 58px;

    color: #FFFFFF;

}

p {
    margin-top: 50px;
    width: 350px;
}
</style>