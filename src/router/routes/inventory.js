export default [
    {
        path: '/inventory',
        name: 'inventory',
        props: true,
        component: () => import('../../views/MyPokemon.vue')
    }
]