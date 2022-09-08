<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Pokemon Habitat</template>
    <div v-for="(habit, index) in habitat" :key="index">{{ index+1 }}. {{ habit }}</div>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Inventory</template>
    <div v-if="total_pokemon !== null">You Have {{ total_pokemon }} Pokemons in your Inventory</div>
    <div v-else>You Have 0 Pokemons in your Inventory</div> 
    <div>
      <router-link to="/pokemonlist">Collect Them !!</router-link>
      </div> 
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Pokemon Region</template>
    <div v-for="(eco, index) in region" :key="index">{{ index+1 }}. {{ eco }}</div>
  </WelcomeItem>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            habitat: [],
            total_pokemon: null,
            region: []
        }
    },
    created() {
        this.getHabitat()
        this.countPokemons()
        this.getRegions()
    },
    methods: {
      getHabitat() {
        axios.get('https://pokeapi.co/api/v2/pokemon-habitat/')
        .then((response) => {
            // console.log(response.data)
            var $datas = response.data.results
            var i
            const $habitat = []
            for(i=0; i<$datas.length; i++) {
                var $data = $datas[i].name
                $habitat.push($data)
            }
            this.habitat = $habitat
            // console.log($habitat)
        }).catch((errors) => {
            console.log(errors)
        })
      },
      countPokemons() {
        // console.log($count)
        if(localStorage.getItem('myPokemon') !== null) {
          var $count = localStorage.getItem('myPokemon')
          var $result = $count.split(',').length
          this.total_pokemon = $result
        }
      },
      getRegions() {
        axios.get('https://pokeapi.co/api/v2/region/')
        .then((response) => {
            // console.log(response.data)
            var $datas = response.data.results
            var i
            const $region = []
            for(i=0; i<$datas.length; i++) {
                var $data = $datas[i].name
                $region.push($data)
            }
            this.region = $region
            // console.log($region)
        }).catch((errors) => {
            console.log(errors)
        })
      },
    },
}
</script>