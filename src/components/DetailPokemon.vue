<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 text-capitalize text-center">
                <table border="1" style="width:100%">
                    <tr>
                        <th class="font-weight-bold text-primary">Pokemon</th>
                        <th class="font-weight-bold text-primary">Information</th>
                    </tr>
                    <tr>
                        <td class="font-weight-bolder">Name</td>
                        <td class="text-left px-5">{{ pokemons.name }}</td>
                    </tr>
                    <tr v-for="(ability, index) in pokemons.abilities" :key="index">
                        <td class="font-weight-bolder">Abilities {{ index+1 }}</td>
                        <td class="text-left px-5">{{ ability.name }}</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bolder">Base Experience</td>
                        <td class="text-left px-5">{{ pokemons.base_experience }} exp</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bolder">Height</td>
                        <td class="text-left px-5">{{ pokemons.height }} feet</td>
                    </tr>
                    <tr>
                        <td class="font-weight-bolder">Weight</td>
                        <td class="text-left px-5">{{ pokemons.weight }} kg</td>
                    </tr>
                    <tr v-for="(held, index) in pokemons.held_items" :key="index">
                        <td class="font-weight-bolder">Drop Item {{ index+1 }}</td>
                        <td class="text-left px-5">{{ held.name }}</td>
                    </tr>
                    <tr v-for="(type, index) in pokemons.types" :key="index">
                        <td class="font-weight-bolder">Type {{ index+1 }}</td>
                        <td class="text-left px-5">{{ type.name }}</td>
                    </tr>
                    <tr v-for="(stat, index) in pokemons.stats" :key="index">
                        <td class="font-weight-bolder">Status {{ index+1 }}</td>
                        <td class="text-left px-5">{{ stat.name }}</td>
                    </tr>
                    <tr>
                        <td colspan="2" style="cursor: pointer;">
                            <div class="row">
                                <div class="col-md-12 text-center" v-if="storage.includes(pokemons.name)">
                                    <span class="font-weight-bolder text-success">You already have this Pokemon</span>
                                </div>
                                <div class="col-md-12 text-center" v-else>
                                    <span class="font-weight-bolder text-info" @click="catchPokemon()">Catch Pokemon</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            pokemons: {
                name: '',
                abilities: [],
                base_experience: null,
                height: null,
                weight: null,
                held_items: [],
                types: [],
                stats: []
            },
            storage: []
        }
    },
    // watch: {
    //     storage: function($data) {
    //         console.log($data)
    //     },
    // },
    created() {
        this.inventoryList()
        this.getDetailPokemon()
    },
    methods: {
        inventoryList() {
            if(localStorage.getItem('myPokemon') !== null) {
                this.storage = localStorage.getItem('myPokemon')
            }
            // console.log(this.storage)
        },
        getDetailPokemon() {
            var $url = sessionStorage.getItem('url')
            axios.get($url)
            .then((response) => {
                // console.log(response.data)
                this.pokemons.name = response.data.name
                var i
                var $abilities = response.data.abilities
                for(i=0; i<$abilities.length; i++) {
                    var $data = {
                        name: $abilities[i].ability.name
                    }
                    this.pokemons.abilities.push($data)
                }
                this.pokemons.base_experience = response.data.base_experience
                this.pokemons.height = response.data.height
                this.pokemons.weight = response.data.weight
                var $heldItems = response.data.held_items
                for(i=0; i<$heldItems.length; i++) {
                    var $data = {
                        name: $heldItems[i].item.name
                    }
                    this.pokemons.held_items.push($data)
                }
                var $types = response.data.types
                for(i=0; i<$types.length; i++) {
                    var $data = {
                        name: $types[i].type.name
                    }
                    this.pokemons.types.push($data)
                }
                var $stats = response.data.stats
                for(i=0; i<$stats.length; i++) {
                    var $data = {
                        name: $stats[i].stat.name
                    }
                    this.pokemons.stats.push($data)
                }
            }).catch((errors) => {
                console.log(errors)
            })
        },
        catchPokemon() {
            var $dice = Math.floor(Math.random() * 2);
            console.log($dice)
            if($dice === 0) {
                alert('you get 50%, sorry you failed to catch Pokemon')
            } else {
                if(this.storage.length !== 0) {
                    const $state = []
                    $state.push(this.storage)
                    $state.push(this.pokemons.name)
                    // console.log($state)
                    localStorage.setItem('myPokemon', $state)
                    alert('Congrats 100%, Pokemon Catched !')
                    setTimeout(function(){
                        location.reload()
                    }, 100)
                } else {
                    const $state = []
                    $state.push(this.pokemons.name)
                    // console.log($state)
                    localStorage.setItem('myPokemon', $state)
                    alert('Congrats 100%, Pokemon Catched !')
                    setTimeout(function(){
                        location.reload()
                    }, 100)
                }
            }
        },
    },
}
</script>

<style>
    table, th, td {
        border: 1px solid black;
    }
</style>