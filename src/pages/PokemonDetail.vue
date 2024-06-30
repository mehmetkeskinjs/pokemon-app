<script setup>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import Header from '../components/Header.vue';

    const loading = ref(true);
    const pokemon = ref(null);
    const route = useRoute();

    onMounted(async () => {
        try {
            const name = route.params.name;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            pokemon.value = response.data;
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    });
</script>

<template>
    <Header />
    <div class="bg-yellow-400/10 w-full h-screen p-8">
        <div v-if="loading" class="flex flex-col gap-2">
            <span class="w-full h-6 bg-gray-200 animate-pulse"></span>
            <span class="w-full h-36 bg-gray-200 animate-pulse"></span>
            <span class="w-full h-6 bg-gray-200 animate-pulse"></span>
            <span class="w-full h-40 bg-gray-200 animate-pulse"></span>
        </div>
        <div v-else class="shadow-sm bg-white p-4 relative">
            <h1 class="capitalize text-4xl font-bold">{{ pokemon.name }}</h1>
            <div class="w-40 h-36">
                <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="w-full h-full"/>
            </div>
            <h2 class="mt-5 text-2xl font-semibold underline">Abilities</h2>
            <ul>
                <li v-for="ability in pokemon.abilities" :key="ability.ability.name" class="capitalize my-2">
                    {{ ability.ability.name }}
                </li>
            </ul>
        </div>
    </div>
</template>