<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';

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
    <div class="shadow rounded-sm hover:shadow-md transition">
        <RouterLink :to="{ name: 'pokemon-detail', params: { name: pokemon.name }}" class=" flex flex-col gap-2 items-center">
            <div class="w-48 h-56 p-4">
                <img 
                    :src="imageUrl" 
                    :alt="pokemon.name" 
                    @load="onImageLoad" 
                    @error="onImageError" 
                    v-show="loaded"
                    class="w-full"
                />
                <div v-if="!loaded" class="w-full h-full bg-gray-300 animate-pulse"></div>
            </div>
            <div class="capitalize bg-yellow-200/30 w-full h-8 flex items-center justify-center text-yellow-600">{{ pokemon.name }}</div>
        </RouterLink>
    </div>
</template>