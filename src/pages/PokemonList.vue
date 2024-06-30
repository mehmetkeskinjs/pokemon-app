<script setup>
    import axios from 'axios';
    import { ref, onMounted, watch } from 'vue';
    import PokemonCard from '../components/PokemonCard.vue';
    import SkeletonLoader from '../components/SkeletonLoader.vue';
    import Header from '../components/Header.vue';
    import Pagination from '../components/Pagination.vue';

    const pokemonList = ref([]);
    const page = ref(1);
    const totalPages = ref(0);
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
            totalPages.value = Math.ceil(data.count / limit);
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    const updatePage = (newPage) => {
        page.value = newPage;
    }

    watch(page, fetchPokemons);

    onMounted(fetchPokemons);
</script>

<template>
    <Header />
    <div v-if="!loading" class="flex items-center justify-center flex-wrap gap-4 mt-4">
        <PokemonCard
            v-for="pokemon in pokemonList"
            :key="pokemon.name"
            :pokemon="pokemon"
            :imageUrl="getPokemonImage(pokemon.url)"
        />
    </div>
    <div v-else class="flex items-center justify-center flex-wrap gap-4 mt-4">
        <SkeletonLoader v-for="n in 20" :key="n" />
    </div>
    <Pagination
        :currentPage="page"
        :totalPages="totalPages"
        @updatePage="updatePage"
    />
</template>
