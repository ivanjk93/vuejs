export default [
    {
        path: '/pokemonlist',
        name: 'pokemonlist',
        props: true,
        component: () => import('../../views/PokemonList.vue')
    }
]