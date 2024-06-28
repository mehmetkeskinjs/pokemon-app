<script setup>
    import axios from 'axios';
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const pokemon = ref(null);
    const route = useRoute();

    onMounted(async () => {
        try {
            const name = route.params.name;
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            pokemon.value = response.data;
        } catch (error) {
            console.error(error);
        }
    });
</script>

<template>
    <div v-if="pokemon">
        <h1>{{ pokemon.name }}</h1>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
        <h2>Abilities</h2>
        <ul>
            <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
                {{ ability.ability.name }}
            </li>
        </ul>
    </div>
</template>