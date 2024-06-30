import { createRouter, createWebHistory } from 'vue-router';
import PokemonList from '../pages/PokemonList.vue';
import PokemonDetail from '../pages/PokemonDetail.vue';

const routes = [
    { path: '/', name: 'pokemon-list', component: PokemonList },
    { path: '/pokemon/:name', name: 'pokemon-detail', component: PokemonDetail },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;