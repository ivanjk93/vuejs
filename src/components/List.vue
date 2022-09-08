<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 text-secondary text-capitalize text-center">
                <table border="1" style="width:100%">
                    <tr>
                        <th class="font-weight-bold">Pokemon Name</th>
                        <th class="font-weight-bold">Action</th>
                    </tr>
                    <tr v-for="(pokemon, index) in pokemons" :key="index">
                        <td>{{ pokemon.name }}</td>
                        <td>
                            <router-link :to="'/detail-pokemon'" @click="state(pokemon.url)">
                                Detail
                            </router-link>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" @click="loadMore()" style="cursor: pointer;">
                            <div class="row">
                                <div class="col-md-6">
                                    <span class="font-weight-bolder text-info" v-if="pages.previous !== null" @click="previousPages()"><i class="bi bi-chevron-left"></i> Previous</span>
                                </div>
                                <div class="col-md-6">
                                    <span class="font-weight-bolder text-info" v-if="pages.next !== null" @click="nextPages()">Next <i class="bi bi-chevron-right"></i></span>
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
// import { BFormSelect } from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

export default {
    components: {
        // BFormSelect,
    },
    data() {
        return {
            pokemons: [],
            pages: {
                next: '',
                previous: ''
            },
        }
    },
    created() {
        this.getListPokemon()
    },
    methods: {
        getListPokemon() {
            axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then((response) => {
                // console.log(response.data)
                this.pages.next = response.data.next
                this.pages.previous = response.data.previous

                var $datas = response.data.results
                var i
                for(i=0; i<$datas.length; i++) {
                    var $data = {
                        name: $datas[i].name,
                        url: $datas[i].url
                    }
                    this.pokemons.push($data)
                }
                // console.log(this.pokemons)
            }).catch((errors) => {
                console.log(errors)
            })
        },
        previousPages() {
            axios.get(this.pages.previous)
            .then((response) => {
                // console.log(response.data)
                this.pages.next = response.data.next
                this.pages.previous = response.data.previous
                
                this.pokemons.splice(0)
                var $datas = response.data.results
                var i
                for(i=0; i<$datas.length; i++) {
                    var $data = {
                        name: $datas[i].name,
                        url: $datas[i].url
                    }
                    this.pokemons.push($data)
                }
                // console.log(this.pokemons)
            }).catch((errors) => {
                console.log(errors)
            })
        },
        nextPages() {
            axios.get(this.pages.next)
            .then((response) => {
                // console.log(response.data)
                this.pages.next = response.data.next
                this.pages.previous = response.data.previous
                
                this.pokemons.splice(0)
                var $datas = response.data.results
                var i
                for(i=0; i<$datas.length; i++) {
                    var $data = {
                        name: $datas[i].name,
                        url: $datas[i].url
                    }
                    this.pokemons.push($data)
                }
                // console.log(this.pokemons)
            }).catch((errors) => {
                console.log(errors)
            })
        },
        state($url) {
            sessionStorage.setItem('url', $url)
        }
    },
}
</script>

<style>
    table, th, td {
        border: 1px solid black;
    }
</style>