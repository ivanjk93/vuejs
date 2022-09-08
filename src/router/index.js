import { createRouter, createWebHistory } from 'vue-router'
import home from './routes/home'
import pokemonList from './routes/pokemonList'
import detailPokemon from './routes/detailPokemon'
import inventory from './routes/inventory'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...home,
    ...pokemonList,
    ...detailPokemon,
    ...inventory,
  ]
})

export default router
