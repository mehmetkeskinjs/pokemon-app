<script setup>
    import { ref } from 'vue';

    const props = defineProps({
        pokemon: Object,
        imageUrl: String
    });

    const loaded = ref(false);

    const onImageLoad = () => {
        loaded.value = true;
    };

    const onImageError = () => {
        loaded.value = false;
        errored.value = true;
    };
</script>

<template>
    <div class="pokemon-card">
        <router-link :to="{ name: 'pokemon-detail', params: { name: pokemon.name }}">
            <div class="image-wrapper">
                <img 
                    :src="imageUrl" 
                    :alt="pokemon.name" 
                    @load="onImageLoad" 
                    @error="onImageError" 
                    v-show="loaded"
                />
                <div v-if="!loaded" class="skeleton-image"></div>
            </div>
            <div class="pokemon-name">{{ pokemon.name }}</div>
        </router-link>
    </div>
</template>
  
<style scoped>
    .pokemon-card {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }

    .image-wrapper {
        width: 60px;
        height: 60px;
        position: relative;
        margin-right: 10px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .skeleton-image {
        width: 100%;
        height: 100%;
        background-color: #e0e0e0;
        border-radius: 50%;
        animation: pulse 1.5s infinite;
    }

    .pokemon-name {
        font-size: 16px;
        font-weight: bold;
    }

    @keyframes pulse {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }
</style>