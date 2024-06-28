<script setup>
    import axios from 'axios';
    import { ref, onMounted, watch } from 'vue';
    import PokemonCard from './PokemonCard.vue';
    import SkeletonLoader from './SkeletonLoader.vue';

    const pokemonList = ref([]);
    const page = ref(1);
    const limit = 20;
    const loading = ref(false);

    const getPokemonImage = (url) => {
        const id = url.split('/').filter(Boolean).pop();
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    };

    const fetchPokemons = async () => {
        try {
            loading.value = true;
            const offset = (page.value - 1) * limit;
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            pokemonList.value = data.results;
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    const prevPage = () => {
        if (page.value > 1) {
            page.value--;
        }
    };

    watch(page, fetchPokemons);

    onMounted(fetchPokemons);
</script>

<template>
    <h1>Pokemon List</h1>
    <div v-if="!loading" class="flex items-center justify-center flex-wrap">
        <PokemonCard
            v-for="pokemon in pokemonList"
            :key="pokemon.name"
            :pokemon="pokemon"
            :imageUrl="getPokemonImage(pokemon.url)"
        />
    </div>
    <div v-else>
        <SkeletonLoader v-for="n in 20" :key="n" />
    </div>
    <div class="pagination">
        <button @click="page > 1 && page--" :disabled="page === 1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <span>Page {{ page }}</span>
        <button @click="page++">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    </div>
</template>
