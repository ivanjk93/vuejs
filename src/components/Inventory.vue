<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 text-capitalize text-center">
                <table border="1" style="width:100%">
                    <tr>
                        <th class="font-weight-bold text-primary">My Pokemon</th>
                        <th class="font-weight-bold text-primary">Name</th>
                        <th class="font-weight-bold text-primary">Action</th>
                    </tr>
                    <tr v-if="inventory.length === 0">
                        <td colspan="3" class="text-center text-warning font-weight-bold">
                            <router-link to="/pokemonlist">
                                Inventory Empty ! Catch Pokemon
                            </router-link>
                        </td>
                    </tr>
                    <tr v-for="(inven, index) in inventory" :key="index">
                        <td class="font-weight-bolder">Pokemon {{ index+1 }}</td>
                        <td class="text-left px-5">{{ inven }}</td>
                        <td class="text-left">
                            <div class="row">
                                <div class="col-md-6 text-center text-danger font-weight-bold" @click="releasePokemon(index)" style="cursor: pointer;">
                                    Release
                                </div>
                                <div :id="'myBtn'+index" class="col-md-6 text-center text-warning font-weight-bold" @click="modalRename(index, inven)" style="cursor: pointer;">
                                    Rename
                                </div>
                            </div>
                        </td>
                        <!-- The Modal -->
                        <div :id="'myModal'+index" class="modal">
                            <!-- Modal content -->
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <form>
                                    <label for="pokemon_name">Change Pokemon Name:</label><br>
                                    <input class="mb-2" type="text" id="pokemon_name" name="pokemon_name" v-model="name" required><br>
                                    <button type="submit" class="btn btn-outline-secondary text-secondary custom-button mr-5">Cancel</button>
                                    <button class="btn btn-outline-secondary text-primary custom-button" @click="changeName(index)">Save</button>
                                </form> 
                            </div>
                        </div>
                        <!-- end modal -->
                    </tr>
                    <tr v-if="inventory.length !== 0">
                        <td colspan="3" class="text-center">
                            <div class="col-md-6 m-auto text-center text-danger font-weight-bold" @click="releaseAll()" style="cursor: pointer;">
                                Release All
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
            inventory: [],
            name: ''
        }
    },
    created() {
        this.getInventory()
    },
    updated() {
        if(this.inventory.length === 0) {
            localStorage.removeItem('myPokemon')
        }
    },
    methods: {
        getInventory() {
            if(localStorage.getItem('myPokemon') !== null) {
                var $list = localStorage.getItem('myPokemon')
                this.inventory = $list.split(",");
                // console.log(this.inventory)
            }
        },
        releasePokemon($id) {
            this.inventory.splice($id, 1)
            localStorage.removeItem('myPokemon')
            var i
            var $datas = this.inventory
            const $state = []
            for(i=0; i<$datas.length; i++) {
                var $data = $datas[i]
                $state.push($data)
            }
            localStorage.setItem('myPokemon', $state)
            // console.log(this.inventory)
        },
        modalRename($id, $name) {
            // console.log($name)
            this.name = $name
            var modal = document.getElementById("myModal"+$id);
            var btn = document.getElementById("myBtn"+$id);
            var span = document.getElementsByClassName("close")[0];

            btn.onclick = function() {
            modal.style.display = "block";
            }

            span.onclick = function() {
            modal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        },
        changeName($id) {
            // console.log($id)
            var $datas = localStorage.getItem('myPokemon')
            const $array = $datas.split(",");
            $array[$id] = this.name;
            localStorage.removeItem('myPokemon')
            localStorage.setItem('myPokemon', $array)
            // console.log($array)
        },
        releaseAll() {
            localStorage.removeItem('myPokemon')
            location.reload()
        },
    },
}
</script>

<style>
    .custom-button:hover {
        color: #ffffff !important;
        background-color: blue;
    }
    
    table, th, td {
        border: 1px solid black;
    }
    
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }

    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
</style>